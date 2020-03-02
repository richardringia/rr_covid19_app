import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import VirusDataRepository from '../repos/VirusDataRepository';

class ListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    VirusDataRepository.all()
      .then(response => {
        // let counts = response.data.map((location) => {
        //   return location.total_confirmed;
        // });

        // this.min = Math.min(...counts);
        // this.max = Math.max(...counts);

        this.setState({
          data: response.data.map((location) => {
            // console.log(location);
          }),
          loading: false,
        });
      })
      .catch(reason => {
        // TODO: CREATE ERROR MESSAGE
      });
  }

  render() {
    if (this.state.loading) return <Text>Loading...</Text>;

    return (
      <Text>test</Text>
    );
  }
}

export default ListComponent;
