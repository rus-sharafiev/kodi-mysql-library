export const proxyImage = (url: string) => {
    if (!url) return ''
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url='

    return (googleProxyURL + encodeURIComponent(url))
}

export default proxyImage