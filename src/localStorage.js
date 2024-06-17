// Handy function from mozilla docs that checks if localStorage is available
import { todos } from "./state";

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

/* EXAMPLE:
 if (storageAvailable("localStorage")) {
'Yippee! We can use localStorage awesomeness'
} else {
'Too bad, no localStorage for us'
} */

function localStorageSetItem(name, item) {
    try {
        if (storageAvailable('localStorage')) {
            const itemJSON = JSON.stringify(item)
            localStorage.setItem(name, itemJSON)
        }

    } catch (e) {
        console.log(e)
    }
}

function localStorageSetItemsOnDOMLoaded() {
    localStorageSetItem('todos', todos)
}

export {
    localStorageSetItem,
    storageAvailable,
    localStorageSetItemsOnDOMLoaded
}