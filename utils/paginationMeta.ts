export function paginationMeta(meta: { page: number; itemsPerPage: number }, _tot: number) {
  const { page, itemsPerPage } = meta
  const start = (page - 1) * itemsPerPage + 1
  const end = Math.min(page * itemsPerPage, _tot)

  return `Showing ${_tot === 0 ? 0 : start} to ${end} of ${_tot} entries`
}
