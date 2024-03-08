import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import Navigation from './android/app/src/Navigation/NavigationScreens/Navigation';
import store from './android/app/src/redux/store';

const App = () => {
  return (
    <PaperProvider>
      <ReduxProvider store={store}>
        <Navigation />
      </ReduxProvider>
    </PaperProvider>
  );
}

export default App;
