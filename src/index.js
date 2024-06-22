import './css/style.css'
import setEventListeners from './eventHandlers'
import { localStorageSetItemsOnDOMLoaded } from './localStorage'

document.addEventListener('DOMContentLoaded', () => {
    setEventListeners();
    // localStorageSetItemsOnDOMLoaded();
});