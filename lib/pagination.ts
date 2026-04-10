export type Pagination = {
  page: number;
  pageSize: number;
  offset: number;
};

export function parsePagination(
  searchParams: URLSearchParams,
  defaults: { page?: number; pageSize?: number; maxPageSize?: number } = {},
): Pagination {
  const pageDefault = defaults.page ?? 1;
  const pageSizeDefault = defaults.pageSize ?? 20;
  const maxPageSize = defaults.maxPageSize ?? 100;

  const parsedPage = Number(searchParams.get("page") ?? pageDefault);
  const parsedPageSize = Number(searchParams.get("pageSize") ?? pageSizeDefault);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : pageDefault;
  const pageSize = Number.isInteger(parsedPageSize) && parsedPageSize > 0 ? Math.min(parsedPageSize, maxPageSize) : pageSizeDefault;
  const offset = (page - 1) * pageSize;

  return { page, pageSize, offset };
}
