import windowChanger from "./injected-helper";

const inject = async (tabId) => {
    chrome.scripting.executeScript(
        {
            target: {
                tabId,
            },
            world: "MAIN", // MAIN in order to access the window object
            func: windowChanger,
        },
        () => {
            console.log("Background script got callback after injection");
        }
    );
};

chrome.runtime.onMessage.addListener((msg, _, cb) => {
    console.log("🚀 ~ chrome.runtime.onMessage.addListener ~ msg", msg);
    cb(123);
});

// Simple example showing how to inject.
// You can inject however you'd like to, doesn't have
// to be with chrome.tabs.onActivated
chrome.tabs.onActivated.addListener((e) => {
    console.log("🚀 ~ chrome.tabs.onActivated.addListener ~ e", e);
    inject(e.tabId);
});

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openSidePanel",
        title: "Open side panel",
        contexts: ["all"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openSidePanel") {
        // This will open the panel in all the pages on the current window.
        chrome.sidePanel.open({ windowId: tab.windowId });
    }
});

chrome.runtime.onMessage.addListener((message, sender) => {
    // The callback for runtime.onMessage must return falsy if we're not sending a response
    (async () => {
        if (message.type === "open_side_panel") {
            // This will open a tab-specific side panel only on the current tab.
            await chrome.sidePanel.open({ tabId: sender.tab.id });
            await chrome.sidePanel.setOptions({
                tabId: sender.tab.id,
                path: "sidepanel.html",
                enabled: true,
            });
        }
    })();
});
