// composables/useProductList.ts
export const useProductList = (ops: { baseQuery?: any[] } = {}) => {
  const route = useRoute()
  const router = useRouter()
  const products = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const title = ref()
  const totalPages = ref(0)
  const pageSize = ref(60)
  const currentPage = ref(1)
  const currentQuery = ref([])
  const queryDesc = ref()
  const filters = ref()
  const ignoreNextPageWatch = ref(true)

  const buildBody = (queryOverride = []) => {
    let body = {
      brands: [],
      models: [],
      colors: [],
      tags: [],
      sword: null,
      bike: null,
      collectionId: null,
      sizes: [],
      categories: [],
      limit: pageSize.value,
      offset: (currentPage.value - 1) * pageSize.value,
    }

    var cQuery = JSON.parse(JSON.stringify(queryOverride))

    for (const bq of ops.baseQuery) {
      const fg = cQuery.find(cq => cq.type === bq.type)
      if (!fg) {
        cQuery.push(bq)
      } else {
        if (fg && !fg.values && fg.values.length === 0) {
          fg.values = bq.values
        }
      }
    }

    for (const facet of cQuery) {
      if (facet.type === "brands") body.brands = facet.values
      else if (facet.type === "categories") body.categories = facet.values
      else if (facet.type === "tags") facet.values.forEach(t => body.tags.push(t))
      else if (facet.type === "sizes") facet.values.forEach(t => body.sizes.push(t))
      else if (facet.type === "models") facet.values.forEach(t => body.models.push(t))
      else if (facet.type === "collection") body.collectionId = facet.value
      else if (facet.type === "colors") facet.values.forEach(t => body.colors.push(t))
      else if (facet.type === "bike") body.bike = facet.value
      else body[facet.type] = facet.value
    }

    return body
  }

  const initialBody = buildBody([])


  watch(currentPage, async () => {
// If this was triggered by a filter change, skip this execution
    if (ignoreNextPageWatch.value) {
      ignoreNextPageWatch.value = false

      return
    }

    console.log("executing search from watch currenctPage: " + currentPage.value)
    await search()
  })

  const scrollToTop = () => {
    if (process.client) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const getQueryDescription = (rs) => {
    if(rs.query?.description?.length > 0)
      return  `<span class="total-results">${ rs?.totalHits } </span>` + rs.query?.description

    return "Resultado"
  }

  const applyResults = (dataResult) => {
    if (dataResult && dataResult.products) {
      total.value = dataResult.totalHits
      totalPages.value = Math.ceil(dataResult.totalHits / pageSize.value)
      title.value = dataResult.query.description
      queryDesc.value = getQueryDescription(dataResult)
      dataResult.products.forEach(p => p.isWished = false)
      products.value = dataResult.products
      if (!filters.value) filters.value = dataResult.filters
    }
  }


  const fetchKey = computed(() => `products-${JSON.stringify(initialBody)}`)

  const search = async () => {
    try {
      console.log("inside search!!")
      products.value = []
      loading.value = true

      scrollToTop()
      const body = buildBody(currentQuery.value)

      let rs = await $fetch(`/api/product/search`, {
        method: "POST",
        body: body,
      })

      applyResults(rs)
    } catch (e) {
      console.log(e.message)
    } finally {
      loading.value = false
    }
  }

  const applyFilters = async filters => {
    const map = new Map()
    for (const f of filters) {
      for (const b of f.buckets) {
        if (b.checked) {
          if (!map.has(f.type))
            map.set(f.type, { type: f.type, values: [] })
          map.get(f.type).values.push(b.id)
        }
      }
    }

    const newQuery = [...map.values()]
    if (currentQuery.value.length === 0 && newQuery.length === 0) {
      return
    }

    if (JSON.stringify(currentQuery.value) !== JSON.stringify(newQuery)) {

      if (currentPage.value !== 1) {
        ignoreNextPageWatch.value = true // Prevent the watcher from calling search()
        currentPage.value = 1
      }
      console.log("NEW QUERY!" + JSON.stringify(newQuery))
      console.log("OLD QUERY!" + JSON.stringify(currentQuery.value))
      currentQuery.value = newQuery

      console.log("executing search from onFilter")
      await search()
    }
  }

  const { data: initialData, pending, error, refresh } = useAsyncData(
    fetchKey.value,
    () => $fetch('/api/product/search', {
      method: 'POST',
      body: initialBody
    }),
    {
      watch: [() => route.query] // Automatically re-runs when URL changes
    }
  )


  if (initialData.value)
    applyResults(initialData.value)


  return {
    products: computed(() => products.value || initialData.value?.products || []),
    total: computed(() => initialData.value?.totalHits || 0),
    currentPage,
    filters,
    applyFilters,
    totalPages,
    loading: pending,
    refresh // Call this manually if needed
  }


}
