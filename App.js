import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';

import Navigation from './android/app/src/Navigation/NavigationScreens/Navigation'
import store from './android/app/src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
     <Navigation/>
    </Provider>
  
  )
}

export default App