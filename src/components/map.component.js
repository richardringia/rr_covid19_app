import React from 'react';
import {Text} from '@ui-kitten/components';
import {Marker, Callout} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {View} from 'react-native';
import axios from 'axios';
import * as d3 from 'd3';
import VirusDataRepository from '../repos/VirusDataRepository';
import MapMarker from './map.marker.component';
import MapHelper from '../helpers/map.helper';

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

class MapComponent extends React.Component {

  mapHelper = new MapHelper();

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }


  componentDidMount() {

    VirusDataRepository.data()
      .then(response => {
        let states = [];
        response.forEach((country, index) => {
          country.states.forEach((state, stateIndex) => {
            states.push(state);
          });
        });
        let counts = states.map((location) => {
          return location.total_confirmed;
        });

        this.mapHelper = new MapHelper(Math.min(...counts), Math.max(...counts));

        this.setState({data: states, loading: false});
      })
      .catch(reason => {
        // TODO: CREATE ERROR MESSAGE
        this.setState({loading: false});
      });
  }

  map;


  render() {
    if (this.state.loading) return <Text>Loading...</Text>;
    return (
      <ClusteredMapView
        style={{flex: 1}}
        data={this.state.data.map((location) => {
          location.location = {
            latitude: parseFloat(location.lat.toString()),
            longitude: parseFloat(location.lng.toString()),
          };
          return location;
        })}
        initialRegion={INIT_REGION}
        ref={this.mapHelper.ref}
        extent={160}
        renderMarker={this.mapHelper.renderMarker}
        renderCluster={this.mapHelper.renderCluster}
      />
    );
  }
}

export default MapComponent;
