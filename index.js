/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoicmljaGFyZHJpbmdpYSIsImEiOiJjazc3dXRhN3kwOXNzM2RwYjByczk4aWFyIn0.6tbiQHBrkeLOrOEnsLsM3A");

AppRegistry.registerComponent(appName, () => App);
