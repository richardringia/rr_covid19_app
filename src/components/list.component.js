import React from 'react';
import {View} from 'react-native';
import {Button, List, ListItem, Text} from '@ui-kitten/components';
import VirusDataRepository from '../repos/VirusDataRepository';

class ListComponent extends React.Component {
  constructor(props, { navigation }) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    VirusDataRepository.allByCountry()
      .then(response => {
        this.setState({
          data: response.map((location) => {
            return {
              title: location.country.name,
              location: location,
            }
          }).sort((a, b) => parseFloat(b.location.total_confirmed) - parseFloat(a.location.total_confirmed))
            .filter((location) => location.location.total_confirmed > 0 || location.location.total_recovered > 0 || location.location.total_deaths > 0 ),
          loading: false,
        });
      })
      .catch(reason => {
        // TODO: CREATE ERROR MESSAGE
      });
  }

  renderItemAccessory = (style, index) => {
    // console.log(style)
    let location = this.state.data[index].location;

    return (
      <View style={{
        ...style,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}>
        <Text style={{
          marginRight: 10,
          color: 'red'
        }}>{location.total_confirmed}</Text>
        <Text  style={{
          marginRight: 10,
          color: 'green'
        }}>{location.total_recovered}</Text>
        <Text style={{
          color: 'black'
        }}>{location.total_deaths}</Text>
      </View>
    )
    // <Button style={style}>FOLLOW</Button>
  };


  renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      // onPress={() => this.props.navigation.navigate('Detail', {title: item.title})}
      // description={`${item.description} ${index + 1}`}
      // icon={renderItemIcon}
      accessory={this.renderItemAccessory}
    />
  );

  render() {
    if (this.state.loading) return <Text>Loading...</Text>;

    return (
      <List
        data={this.state.data}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ListComponent;
