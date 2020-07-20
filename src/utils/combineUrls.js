/**
 * Creates a new URL by combining the specified URLs
 * @param {string} baseUrl The base URL
 * @param {string} relativeUrl The relative URL
 * @returns {string} The combined URL
 */
function combineUrls (baseUrl = '', relativeUrl = '') {
    if (!relativeUrl) return String(baseUrl)

    return (
        String(baseUrl).replace(/\/+$/, '') +
        '/' +
        String(relativeUrl).replace(/^\/+/, '')
    )
}

export {
    combineUrls,
}
