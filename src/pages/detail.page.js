import React from 'react';
import {SafeAreaView} from 'react-native';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import ListComponent from '../components/list.component';
import PropTypes from 'prop-types';
import SingleMapComponent from '../components/single.map.component';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
  );



  navigateBack = () => {
    this.props.navigation.goBack();
  };

  BackAction = () => (
    <TopNavigationAction  icon={this.BackIcon} onPress={this.navigateBack}/>
  );


  render() {
    const {item} = this.props.route.params;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title={item.name} alignment='center'  titleStyle={{color: 'rgb(0,101,50)'}}  leftControl={this.BackAction()}/>
        <SingleMapComponent location={item} />
      </SafeAreaView>
    );
  }
}

// DetailPage.propTypes = {
//   title: PropTypes.string.isRequired
// };

export default DetailPage;
