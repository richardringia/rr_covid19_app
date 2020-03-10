import React from 'react';
import {Card, CardHeader, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import PropTypes from 'prop-types';

class ListCardComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  header(name) {
    name = name === 'undefined' ? 'Others' : name;
    return (
      <CardHeader title={name}/>
    )
  }

  render() {
    return (
      <Card {...this.props} header={() => this.header(this.props.name)} style={{
        marginVertical: 8,
      }}>
        <View>
          <Text>Confirmed: {this.props.total_confirmed}</Text>
          <Text>Deaths: {this.props.total_deaths}</Text>
          <Text>Recovered: {this.props.total_recovered}</Text>
        </View>
      </Card>
    );
  }

}
ListCardComponent.propTypes = {
  name: PropTypes.string.isRequired,
  total_confirmed: PropTypes.number.isRequired,
  total_deaths: PropTypes.number.isRequired,
  total_recovered: PropTypes.number.isRequired,
};
export default ListCardComponent;
