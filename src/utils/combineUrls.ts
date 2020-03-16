/**
 * Creates a new URL by combining the specified URLs
 * @param baseUrl The base URL
 * @param relativeUrl The relative URL
 * @returns The combined URL
 */
function combineUrls (baseUrl = '', relativeUrl = '') {
    if (!relativeUrl) return baseUrl

    return (
        baseUrl.replace(/\/+$/, '') +
        '/' +
        relativeUrl.replace(/^\/+/, '')
    )
}

export {
    combineUrls,
}
