import { AsyncStorage} from 'react-native';
import { applyMiddleware, createStore,compose } from "redux";
import thunk from "redux-thunk";
import rootReducer  from "../Reducers/index";
import {persistStore, persistReducer } from "redux-persist";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,

  stateReconciler: hardSet
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store


const middleware = [thunk];
const store = createStore(
  persistedReducer,
  undefined,
  compose(
  applyMiddleware(...middleware)
  )
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store,null,() => { store.getState});
// Exports
export {
  store,
  persistor,
};
