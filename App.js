/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import {AppNavigator} from './src/navigation/BottomNavigation';


const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);
export default App;
