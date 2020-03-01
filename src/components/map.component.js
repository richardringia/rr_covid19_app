import React from 'react';
import {Text} from "@ui-kitten/components";
import axios from "axios";
import MapboxGL from "@react-native-mapbox-gl/maps";


class MapComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            points: [],
        };
    }


    componentDidMount() {
        axios.get('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
            .then(response => {
                this.setState({
                    loading: false,
                    points: response.data
                })
            })
    }


    _map;

    renderPoints = () => {
        const { points } = this.state;

        return (
            <MapboxGL.ShapeSource
                id="symbolLocationSource"
                shape={points}
            >

            </MapboxGL.ShapeSource>
        )
    }



    render() {
        if (this.state.loading) return <Text>Loading...</Text>;

        return (
            <MapboxGL.MapView
                ref={c => (this._map = c)}
                zoomEnabled
                style={[{ flex: 1 }]}>
                {this.renderPoints()}
            </MapboxGL.MapView>
        );
    }
}

export default MapComponent;
