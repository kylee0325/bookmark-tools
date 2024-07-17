export function faviconURL(url: string) {
    const u = new URL(url).origin;
    const faviconUrl = new URL(chrome.runtime.getURL("/_favicon/"));
    faviconUrl.searchParams.set("pageUrl", u);
    faviconUrl.searchParams.set("size", "32");
    return faviconUrl.toString();
    // return `${u}/favicon.ico`;
    // return `chrome://favicon/${u}`;
}
