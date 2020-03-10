import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ListCardComponent from './list.card.component';

class LazyLoadingScrollViewComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: [],
    };
  }

  add = 10;


  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 300;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  componentDidMount() {
    this.setState({
      components: this.filteredComponents(),
    });
  }

  filteredComponents() {
    if (this.props.children !== undefined) {
      let count = 0;
      return this.props.children.filter(() => {
        let returnValue = false;
        if (count >= this.state.components.length && count < (this.state.components.length + this.add)) {
          returnValue = true;
        }
        count++;
        return returnValue;
      })
    }

  }

  addComponents() {
    let newComponents = [...this.state.components, ...this.filteredComponents()];
    this.setState({
      components: newComponents
    })
  }

  render() {
    return (
      <ScrollView
        {...this.props}
        style={{
          flex: 1,
          marginHorizontal: 8,
        }}
        scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.addComponents();
          }
        }}
      >
        {
          this.state.components.length > 0 ?
            this.state.components
            :
            null
        }
      </ScrollView>
    );
  }

}

// LazyLoadingScrollViewComponent.propTypes = {
//   data: PropTypes.array.isRequired,
// };
export default LazyLoadingScrollViewComponent;
