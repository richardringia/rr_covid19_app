import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button, List, ListItem, Text} from '@ui-kitten/components';
import VirusDataRepository from '../repos/VirusDataRepository';
import ListCardComponent from './list.card.component';
import LazyLoadingScrollViewComponent from './lazy.loading.scroll.view.component';

class ListComponent extends React.Component {
  constructor(props, {navigation}) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    // VirusDataRepository.allByCountry()
    //   .then(response => {
    //     this.setState({
    //       data: response.map((location) => {
    //         return {
    //           title: location.country.name,
    //           location: location,
    //         };
    //       }).sort((a, b) => parseFloat(b.location.total_confirmed) - parseFloat(a.location.total_confirmed))
    //         .filter((location) => location.location.total_confirmed > 0 || location.location.total_recovered > 0 || location.location.total_deaths > 0),
    //       loading: false,
    //     });
    //   })
    //   .catch(reason => {
    //     // TODO: CREATE ERROR MESSAGE
    //   });

    VirusDataRepository.data()
      .then(response => {
        this.setState({
          data: response.sort((a, b) => parseFloat(b.total_confirmed) - parseFloat(a.total_confirmed))
            .filter((state) => state.total_confirmed > 0),
          loading: false,
        });
      })
      .catch(reason => {
        // TODO: CREATE ERROR MESSAGE
      });
  }

  renderCard(state, index) {
    return (
      <ListCardComponent key={index} name={state.name} total_confirmed={state.total_confirmed}
                         total_deaths={state.total_deaths} total_recovered={state.total_recovered}
                         onPress={() => {
                           this.props.navigation.navigate('Detail', {item: state});
                         }}/>
    );
  }


  render() {
    if (this.state.loading) return <Text>Loading...</Text>;
    return (
      <LazyLoadingScrollViewComponent>
        {this.state.data.map((item, index) => {
          return this.renderCard(item, index);
        })}
      </LazyLoadingScrollViewComponent>
    );
  }
}

export default ListComponent;
