// composables/useProductList.ts

const ARRAY_FACETS = ['brands', 'categories', 'tags', 'sizes', 'models', 'colors'] as const
const SCALAR_FACETS = ['bike', 'collection', 'sword', 'orderBy'] as const

export const useProductList = (ops: { baseQuery?: any[] } = {}) => {
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const filters = ref()
  const orderBy = ref()

  // ─── URL helpers ──────────────────────────────────────────────

  const parseFiltersFromUrl = (query = route.query): any[] => {
    const result: any[] = []
    for (const type of ARRAY_FACETS) {
      if (query[type]) result.push({ type, values: (query[type] as string).split(',') })
    }
    for (const type of SCALAR_FACETS) {
      if (query[type]) result.push({ type, value: query[type] as string })
    }
    return result
  }

  const filtersToUrlQuery = (filterQuery: any[], page: number): Record<string, string> => {
    const params: Record<string, string> = {}
    if (page > 1) params.page = String(page)
    for (const facet of filterQuery) {
      if (facet.values?.length) params[facet.type] = facet.values.join(',')
      else if (facet.value != null) params[facet.type] = String(facet.value)
    }
    if (orderBy.value?.id) params['orderBy'] = orderBy.value.id
    return params
  }

  // ─── State ────────────────────────────────────────────────────

  const currentPage = ref(parseInt(route.query.page as string) || 1)
  const currentQuery = ref<any[]>(parseFiltersFromUrl())
  const pageSize = ref(60)

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
      if (!fg || !fg.value) cQuery.push(bq)
      else if (fg && !fg.values && fg.values?.length === 0) fg.values = bq.values
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

    if (orderBy.value) body.orderBy = orderBy.value.id
    return body
  }

  // ─── Reactive body (drives both the key and the fetch) ────────
  //
  // Computed so any change to currentQuery, currentPage, or orderBy
  // automatically invalidates the cache key and triggers a new fetch.

  const fetchBody = computed(() => buildBody(currentQuery.value, currentPage.value))

  // ─── Single useAsyncData — runs on SERVER and reacts on client ─
  //
  // • The key is a function → Nuxt treats it as a computed key and
  //   re-runs the handler whenever it changes.
  // • `watch: [fetchBody]` is the explicit trigger on the client side.
  // • No separate search() / $fetch call needed anywhere.

  const { data: searchData, pending } = useAsyncData(
    () => `products-${JSON.stringify(fetchBody.value)}`,  // reactive cache key
    () => $fetch('/api/product/search', { method: 'POST', body: fetchBody.value }),
    { watch: [fetchBody] },
  )

  // ─── Derived state from searchData ────────────────────────────

  const products = computed(() => searchData.value?.products ?? [])
  const total    = computed(() => searchData.value?.totalHits ?? 0)
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const title    = computed(() => searchData.value?.query?.description ?? '')

  const queryDesc = computed(() => {
    if (!searchData.value) return undefined
    const rs = searchData.value
    if (rs.query?.description?.length > 0)
      return `<span class="total-results">${rs.totalHits}</span> ` + rs.query.description
    return 'Resultado'
  })

  // Populate filters only once (first response)
  watch(searchData, (val) => {
    if (val && !filters.value) filters.value = val.filters
  }, { immediate: true })

  // ─── URL → state sync (back/forward) ──────────────────────────
  //
  // Only updates the refs — the fetchBody computed reacts automatically.

  watch(() => route.query, (newRouteQuery) => {
    currentPage.value  = parseInt(newRouteQuery.page as string) || 1
    currentQuery.value = parseFiltersFromUrl(newRouteQuery)
  })

  // Scroll to top whenever the data refreshes on the client
  watch(searchData, () => {
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // ─── Public API ───────────────────────────────────────────────

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
    if (JSON.stringify(currentQuery.value) === JSON.stringify(newQuery)) return
    await router.push({ query: filtersToUrlQuery(newQuery, 1) })
  }

  const setPage = async (page: number) => {
    await router.push({ query: filtersToUrlQuery(currentQuery.value, page) })
  }

  watch(orderBy, async () => {
    await router.push({ query: filtersToUrlQuery(currentQuery.value, 1) })
  })

  watch(currentPage, async (page) => {
    await setPage(page)
  })

  return {
    products,
    total,
    queryDesc,
    totalPages,
    currentPage,
    filters,
    applyFilters,
    title,
    setPage,
    orderBy,
    loading: computed(() => pending.value || loading.value),
  }
}
