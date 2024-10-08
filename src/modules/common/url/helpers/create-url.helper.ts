export function createUrl(
  host: string,
  port: number,
  search?: URLSearchParams,
  secure = false,
) {
  const protocol = secure ? 'https' : 'http';
  const url = new URL(`${protocol}://${host}:${port}`);

  if (search) {
    url.search = search.toString();
  }

  return url;
}
