/**
 * Creates a new URL by combining the specified URLs
 * @param {string} baseUrl The base URL
 * @param {string} relativeUrl The relative URL
 * @returns {string} The combined URL
 */
export function combineUrls (baseUrl: string | number = '', relativeUrl: string | number = '') {
  const strBaseUrl = baseUrl === null ? '' : String(baseUrl)
  const strRelativeUrl = relativeUrl === null ? '' : String(relativeUrl)

  if (!strRelativeUrl) return strBaseUrl

  return (
    strBaseUrl.replace(/\/+$/, '') +
    '/' +
    strRelativeUrl.replace(/^\/+/, '')
  )
}
