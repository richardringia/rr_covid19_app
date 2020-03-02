import React from 'react';
import {Text} from '@ui-kitten/components';
import {Marker, Callout} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {View} from 'react-native';
import axios from 'axios';
import * as d3 from 'd3';

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
    axios.get('http://127.0.0.1:8000/api/virus/all', {
      headers: {
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2RmYzc0YWUzNmVkYWQ5MDNjNWNiODMyNzhlZjE0NjhiYjQ1NTVlY2QzYWUxY2VmOGVlYWIwZTVhYzQ3NmI5ZmMwYWU4NmJjZTEzMTdkMjIiLCJpYXQiOjE1ODMxNTY0MDAsIm5iZiI6MTU4MzE1NjQwMCwiZXhwIjoxNjE0NjkyNDAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.QZS4r8_nLZuZCqJ5o_-AoZ7ito3GMIlrMObkAfUs7RPJqj2dh4v3_2Nn9nxL6CXf8Z_0UyKJuflSOk03478RUneTgNb8TwdgA7G16DGsNDK9sd7PmBY55Gx7b-8jINTsGmCafBUvxEZ0Jk7NJlZQm2Q6s7mpCMjbCKpFgtQDerriq8ycqJ1bUnXqn29ScQhAdmAr_xOFPn262PuZmGjvS5BbLtmcAvnMSkZOggBxCMKI-l7-wDR2YYTnP-nPYgdKUTPRrzeNFJD4nOJAFv8dy7LdFs-1OvVQTycrelOSzwwPr-16g9Pi3rGgPVPvG6kFSuKGwafIEeTi_jm3vlh5q_TeXw2TsSpxvhwDcplojhU1Qo13eU1O6KYoiUfIBjm0blFjIddw3Oa8x4KBKgGeQGmyIpZ9Up8lu7pBPQy_jf4TVgS1A8lOxraLk6TrXSct8XHNUqH-c32_jT8vdq0LBgNMusMJ0oK6BvSSX95LaGqD4KREC2SPMR9_rhyznDsHV2ssIjM5QwwCWBqesALKHAA36YqwGG8x9Z3URyuXn93IEQMtcJK3SmrRz057w2Tk_r-3lFqc1RNmCCajneGtrZOONMiNvKcP87ruOCp-sEdWX8Ur93Q5LSw9u5OOoZIoWVGsNpR9HuIuWMpYrzPb9ywzCBoqcdCqKsajnYeWtXk',
      },
    })
      .then(response => {
        console.log(response);

        let counts = response.data.map((location) => {
          return location.total_confirmed;
        });

        this.min = Math.min(...counts);
        this.max = Math.max(...counts);

        this.setState({data: response.data, loading: false});
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
      <Marker coordinate={coordinate} onPress={onPress} style={this.getCircleStyle(total)}>
        <View >
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
      </Marker>
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

    return {
      borderRadius: size/2,
      borderWidth: 3,
      borderColor: 'rgb(51,103,255)',
      height: size,
      width: size,
      backgroundColor: 'rgba(40, 40, 40, 0.8)',
    }
  }

  /**
   * Get the circle text style
   * @param count
   * @returns {{color: string, textAlign: string, lineHeight: *, fontWeight: string}}
   */
  getTextCircleStyle(count) {
    let size = this.getCount(count);
    return {
      lineHeight: size,
      textAlign: 'center',
      color: 'rgb(51,103,255)',
      fontWeight: 'bold'
    }
  }

  /**
   * Render the marker
   * @param data
   * @returns {*}
   */
  renderMarker = (data) => {
    // console.log(data);
    return (
      <Marker coordinate={data.location} style={this.getCircleStyle(data.total_confirmed)} key={data.id || Math.random()}>
        <View>
          <Text style={this.getTextCircleStyle(data.total_confirmed)}>{data.total_confirmed}</Text>
        </View>
      </Marker>
    );
  };

  render() {
    if (this.state.loading) return <Text>Loading...</Text>;

    return (
      <ClusteredMapView
        style={{flex: 1}}
        data={this.state.data}
        initialRegion={INIT_REGION}
        ref={(r) => {
          this.map = r;
        }}
        extent={160}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster}/>
    );
  }
}

export default MapComponent;
