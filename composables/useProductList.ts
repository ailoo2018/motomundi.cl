// composables/useProductList.ts

const ARRAY_FACETS = ['brands', 'categories', 'tags', 'sizes', 'models', 'colors'] as const
const SCALAR_FACETS = ['bike', 'collection', 'sword'] as const

export const useProductList = (ops: { baseQuery?: any[] } = {}) => {
  const route = useRoute()
  const router = useRouter()
  const products = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const title = ref()
  const totalPages = ref(0)
  const pageSize = ref(60)
  const queryDesc = ref()
  const filters = ref()

  // ─── URL helpers ──────────────────────────────────────────────

  /** Deserialise ?brands=nike,adidas&page=2 → internal query array */
  const parseFiltersFromUrl = (query = route.query): any[] => {
    const result: any[] = []
    for (const type of ARRAY_FACETS) {
      if (query[type]) {
        result.push({ type, values: (query[type] as string).split(',') })
      }
    }
    for (const type of SCALAR_FACETS) {
      if (query[type]) {
        result.push({ type, value: query[type] as string })
      }
    }
    return result
  }

  /** Serialise internal query array + page → plain URL params object */
  const filtersToUrlQuery = (filterQuery: any[], page: number): Record<string, string> => {
    const params: Record<string, string> = {}
    if (page > 1) params.page = String(page)
    for (const facet of filterQuery) {
      if (facet.values?.length) params[facet.type] = facet.values.join(',')
      else if (facet.value != null) params[facet.type] = String(facet.value)
    }
    return params
  }

  // ─── State (initialised from URL so a back-navigation restores it) ──

  const currentPage = ref(parseInt(route.query.page as string) || 1)
  const currentQuery = ref<any[]>(parseFiltersFromUrl())

  // ─── Body builder ─────────────────────────────────────────────

  const buildBody = (queryOverride: any[] = [], page = currentPage.value) => {
    const body: Record<string, any> = {
      brands: [], models: [], colors: [], tags: [],
      sword: null, bike: null, collectionId: null,
      sizes: [], categories: [],
      limit: pageSize.value,
      offset: (page - 1) * pageSize.value,
    }

    const cQuery = JSON.parse(JSON.stringify(queryOverride))

    for (const bq of (ops.baseQuery ?? [])) {
      const fg = cQuery.find((cq: any) => cq.type === bq.type)
      if (!fg) {
        cQuery.push(bq)
      } else if (fg && !fg.values && fg.values.length === 0) {
        fg.values = bq.values
      }
    }

    for (const facet of cQuery) {
      if      (facet.type === 'brands')     body.brands      = facet.values
      else if (facet.type === 'categories') body.categories  = facet.values
      else if (facet.type === 'tags')       facet.values.forEach((t: any) => body.tags.push(t))
      else if (facet.type === 'sizes')      facet.values.forEach((t: any) => body.sizes.push(t))
      else if (facet.type === 'models')     facet.values.forEach((t: any) => body.models.push(t))
      else if (facet.type === 'collection') body.collectionId = facet.value
      else if (facet.type === 'colors')     facet.values.forEach((t: any) => body.colors.push(t))
      else if (facet.type === 'bike')       body.bike        = facet.value
      else body[facet.type] = facet.value
    }

    return body
  }

  // ─── SSR / initial load via useAsyncData ──────────────────────
  // Key includes URL state so SSR and client-side cache are correct
  // per unique filter+page combination.

  const initialBody = buildBody(currentQuery.value)
  const fetchKey = `products-${JSON.stringify(initialBody)}`

  const { data: initialData, pending } = useAsyncData(
    fetchKey,
    () => $fetch('/api/product/search', { method: 'POST', body: initialBody }),
  )

  // ─── Helpers ──────────────────────────────────────────────────

  const scrollToTop = () => {
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getQueryDescription = (rs: any) => {
    if (rs.query?.description?.length > 0)
      return `<span class="total-results">${rs?.totalHits}</span> ` + rs.query?.description
    return 'Resultado'
  }

  const applyResults = (dataResult: any) => {
    if (dataResult?.products) {
      total.value       = dataResult.totalHits
      totalPages.value  = Math.ceil(dataResult.totalHits / pageSize.value)
      title.value       = dataResult.query.description
      queryDesc.value   = getQueryDescription(dataResult)
      dataResult.products.forEach((p: any) => (p.isWished = false))
      products.value    = dataResult.products
      if (!filters.value) filters.value = dataResult.filters
    }
  }

  // Hydrate from SSR data on first render
  if (initialData.value) applyResults(initialData.value)

  // ─── Core search (always uses current ref state) ──────────────

  const search = async () => {
    try {
      products.value = []
      loading.value  = true
      scrollToTop()

      const rs = await $fetch('/api/product/search', {
        method: 'POST',
        body: buildBody(currentQuery.value, currentPage.value),
      })

      applyResults(rs)
    } catch (e: any) {
      console.error(e.message)
    } finally {
      loading.value = false
    }
  }

  // ─── URL → state sync (back / forward button) ─────────────────
  // `immediate: false` (default) means this does NOT fire on mount,
  // so there is no double-fetch on first load.

  watch(
    () => route.query,
    (newRouteQuery) => {
      currentPage.value  = parseInt(newRouteQuery.page as string) || 1
      currentQuery.value = parseFiltersFromUrl(newRouteQuery)
      search()
    },
  )

  // ─── Public API ───────────────────────────────────────────────

  /**
   * Called by the filter sidebar.  Derives the new query from checked
   * buckets, resets to page 1, and pushes a new history entry so the
   * user can navigate back to the unfiltered state.
   */
  const applyFilters = async (newFilters: any[]) => {
    const map = new Map<string, { type: string; values: any[] }>()
    for (const f of newFilters) {
      for (const b of f.buckets) {
        if (b.checked) {
          if (!map.has(f.type)) map.set(f.type, { type: f.type, values: [] })
          map.get(f.type)!.values.push(b.id)
        }
      }
    }

    const newQuery = [...map.values()]

    // Bail out early when nothing changed
    if (JSON.stringify(currentQuery.value) === JSON.stringify(newQuery)) return

    // Push to URL – the route watcher above will call search()
    await router.push({ query: filtersToUrlQuery(newQuery, 1) })
  }

  /**
   * Called by the pagination component.  Pushes a new history entry
   * so the user can navigate back to the previous page.
   */
  const setPage = async (page: number) => {
    await router.push({ query: filtersToUrlQuery(currentQuery.value, page) })
  }

  return {
    products:    computed(() => products.value ?? initialData.value?.products ?? []),
    total:       computed(() => total.value    || initialData.value?.totalHits || 0),
    queryDesc,
    totalPages,
    currentPage: computed(() => currentPage.value),
    filters,
    applyFilters,
    setPage,
    loading:     computed(() => pending.value || loading.value),
  }
}
