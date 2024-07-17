const windowChanger = (): void => {
    const formatFileIdByUrl = (figmaUrl) => {
        console.log("🚀 ~ formatFileIdByUrl ~ figmaUrl", figmaUrl);
        let fileId = null;
        try {
            fileId = figmaUrl.match(/file\/([a-z0-9]+)\//i)[1];
        } catch (e) {}
        return fileId;
    };

    const anotherFunc = (): any => {
        return window.location;
    };

    // Here's an example where we can reference the window object
    // and add a new property to it
    window.hello = {
        world: "from injected content script",
        fileId: formatFileIdByUrl(window.location.href),
        coolNumber: anotherFunc(),
        // you can call other functions from the injected script
        // but they must be declared inside the injected function
        // or be present in the global scope
    };
    //   window.addEventListener("message", (msg) => {
    //     console.log("msg", msg)
    //   })
    console.log("chrome", chrome);
    //   chrome.runtime.onMessage.addListener((msg, _, cb) => {
    //     console.log("🚀 ~ chrome.runtime.onMessage.addListener ~ msg", msg)

    //     cb(123)
    //     return false
    //   })

    // Here's an example where we show you can reference the DOM
    // This console.log will show within the tab you injected into
    // console.log(document.getElementsByTagName("html"))
};

export default windowChanger;
