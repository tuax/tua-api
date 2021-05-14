/**
 * Creates a new URL by combining the specified URLs
 * @param {string} baseUrl The base URL
 * @param {string} relativeUrl The relative URL
 * @returns {string} The combined URL
 */
function combineUrls (baseUrl = '', relativeUrl = '') {
  const strBaseUrl = baseUrl === null ? '' : String(baseUrl)
  const strRelativeUrl = relativeUrl === null ? '' : String(relativeUrl)

  if (!strRelativeUrl) return strBaseUrl

  return (
    strBaseUrl.replace(/\/+$/, '') +
        '/' +
        strRelativeUrl.replace(/^\/+/, '')
  )
}

export {
  combineUrls,
}
