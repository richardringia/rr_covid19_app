import React from 'react';
import {SafeAreaView} from 'react-native';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import ListComponent from '../components/list.component';
import PropTypes from 'prop-types';

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
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title={this.props.route.params.title} alignment='center'  titleStyle={{color: 'rgb(0,101,50)'}}  leftControl={this.BackAction()}/>
      </SafeAreaView>
    );
  }
}

DetailPage.propTypes = {
  title: PropTypes.string.isRequired
};

export default DetailPage;
