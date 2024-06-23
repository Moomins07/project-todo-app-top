import './css/style.css'
import setEventListeners from './eventHandlers'
import { _initializeAppState } from './state';


document.addEventListener('DOMContentLoaded', () => {
    setEventListeners();
    _initializeAppState()

});