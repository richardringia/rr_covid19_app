import React from 'react';
import {Card, CardHeader, List, ListItem, Text} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import MapHelper from '../helpers/map.helper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListCardComponent from './list.card.component';

class SingleMapComponent extends React.Component {

  mapHelper = new MapHelper();

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    let counts = this.props.location.states.map((state) => {
      return state.total_confirmed;
    });

    this.mapHelper = new MapHelper(Math.min(...counts), Math.max(...counts));

    this.setState({
      loading: false,
    });
  }

  renderCard = (state) => {
    return (
      <ListCardComponent key={state.id} name={state.name} total_confirmed={state.total_confirmed}
                         total_deaths={state.total_deaths} total_recovered={state.total_recovered}/>
    );
  };


  render() {
    if (this.state.loading) return <Text>Loading...</Text>;
    let {location} = this.props;

    return (
      <View style={{flex: 1}}>
        {
          location.lat != null && location.lng != null ?
            <View style={{width: '100%', height: 250}}>
              <ClusteredMapView
                style={{flex: 1}}
                initialRegion={{
                  latitude: parseFloat(location.lat.toString()),
                  longitude: parseFloat(location.lng.toString()),
                  latitudeDelta: 40,
                  longitudeDelta: 40,
                }}
                data={location.states.map((state => {
                  return {
                    ...state,
                    location: {
                      latitude: parseFloat(state.lat.toString()),
                      longitude: parseFloat(state.lng.toString()),
                    }
                  };
                }))}
                ref={this.mapHelper.ref}
                extent={160}
                renderMarker={this.mapHelper.renderMarker}
                renderCluster={this.mapHelper.renderCluster}
              >

              </ClusteredMapView>
            </View>
            :
            null
        }

        <ScrollView style={{
          flex: 1,
          marginHorizontal: 8,
        }}>
          {location.states.map(this.renderCard)}
        </ScrollView>
      </View>
    );
  }
}

SingleMapComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SingleMapComponent;
