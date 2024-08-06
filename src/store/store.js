import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'

const persist_config = {
    key: 'root',
    storage
}

const persist_reducer = persistReducer(persist_config, rootReducer)

const store = createStore(persist_reducer)
const persistor = persistStore(store)

export { store, persistor }