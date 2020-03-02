import React from 'react';
import {Layout, Text, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-native"
import MapComponent from '../components/map.component';

class MapPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='COVID-19 MAP' alignment='center' titleStyle={{color: 'rgb(0,101,50)'}}/>
        <MapComponent />
      </SafeAreaView>
    );
  }
}

export default MapPage;
