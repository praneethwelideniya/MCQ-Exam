import React, { Component } from 'react'
import { View,Text} from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import {store,persistor}  from './Stores/setup'
import RootScreen from './Containers/RootScreen'
import SplashScreen from './Containers/SplashScreen'
import {persistStore} from "redux-persist";



export default class App extends Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
       */

      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
         <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <RootScreen />
        </PersistGate>

      </Provider>
    )
  }
}
