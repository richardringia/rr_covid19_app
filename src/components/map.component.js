import React from 'react';
import {Text} from '@ui-kitten/components';
import {Marker, Callout} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {View} from 'react-native';
import axios from 'axios';
import * as d3 from 'd3';
import VirusDataRepository from '../repos/VirusDataRepository';
import MapMarker from './map.marker.component';

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  min = 1;
  max = 100;


  componentDidMount() {

    VirusDataRepository.all()
      .then(response => {
        let counts = response.map((location) => {
          return location.total_confirmed;
        });

        this.min = Math.min(...counts);
        this.max = Math.max(...counts);

        this.setState({data: response, loading: false});
      })
      .catch(reason => {
        // TODO: CREATE ERROR MESSAGE
        this.setState({loading: false});
      });
  }

  map;

  /*
  * Render the cluster
  * */
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;


    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);
    let total = 0;
    for (let i = 0; i < clusteredPoints.length; i++) {
      let point = clusteredPoints[i];
      total = total + point.properties.item.total_confirmed;
    }
    return (
      <MapMarker coordinate={{
        latitude: Number(coordinate.latitude),
        longitude: Number(coordinate.longitude),
      }} onPress={onPress} style={this.getMarkerStyle(total)}>
        <View style={this.getCircleStyle(total)}>
          <Text style={this.getTextCircleStyle(total)}>
            {total}
          </Text>
        </View>
        {
          /*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */
        }
      </MapMarker>
    );
  };

  /*
  * Logarithme for getting te circle size
  * https://www.d3indepth.com/scales/
  * */
  getCount(count) {
    let logScale = d3.scaleLog()
      .domain([this.min + 1, this.max])
      .range([40, 150]);

    return logScale(count);
  }


  /**
   * Get the circle style
   * @param count
   * @returns {{borderColor: string, backgroundColor: string, borderRadius: number, borderWidth: number, width: *, height: *}}
   */
  getCircleStyle(count) {
    let size = this.getCount(count);
    if (isNaN(size)) {
      size = 40;
    }
    return {
      borderRadius: size / 2,
      borderWidth: 3,
      borderColor: 'rgb(0,101,50)',
      height: size,
      width: size,
      backgroundColor: 'rgba(58,169,53, 0.4)',
    };
  }


  /**
   * Get the style of the marker with the correct count
   * @param count
   */
  getMarkerStyle(count) {
    let size = this.getCount(count);
    if (isNaN(size)) {
      size = 40;
    }
    return {
      height: size,
      width: size,
    };
  }

  /**
   * Get the circle text style
   * @param count
   * @returns {{color: string, textAlign: string, lineHeight: *, fontWeight: string}}
   */
  getTextCircleStyle(count) {
    let size = this.getCount(count);
    if (isNaN(size)) {
      size = 40;
    }
    return {
      lineHeight: size,
      textAlign: 'center',
      color: 'rgb(0,101,50)',
      fontWeight: 'bold',
    };
  }

  /**
   * Render the marker
   * @param data
   * @returns {*}
   */
  renderMarker = (data) => {
    return (
      <MapMarker coordinate={{
        latitude: parseFloat(data.location.latitude),
        longitude: parseFloat(data.location.longitude),
      }}
                 key={data.id || Math.random()}
                 style={this.getMarkerStyle(data.total_confirmed)}>
        <View style={this.getCircleStyle(data.total_confirmed)}>
          <Text style={this.getTextCircleStyle(data.total_confirmed)}>{data.total_confirmed}</Text>
        </View>
      </MapMarker>
    );
  };

  render() {
    if (this.state.loading) return <Text>Loading...</Text>;
    return (
      <ClusteredMapView
        style={{flex: 1}}
        data={this.state.data.map((location) => {
          location.location = {
            latitude: parseFloat(location.location.latitude.toString()),
            longitude: parseFloat(location.location.longitude.toString()),
          };
          return location;
        })}
        initialRegion={INIT_REGION}
        ref={(r) => {
          this.map = r;
        }}
        extent={160}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster}
      />
    );
  }
}

export default MapComponent;
