import React from 'react';

import { Text, View, Image, TouchableHighlight } from 'react-native';

class IngredientsCard extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSelect = this.toggleSelect.bind(this);
  }

  getImageUrl(image) {
    switch (image) {
      case 'chicken':
        return require('../../assets/img/chicken.jpg');
      case 'beef':
        return require('../../assets/img/beef.jpg');
      case 'pork':
        return require('../../assets/img/pork.jpg');
      case 'shiitake':
        return require('../../assets/img/shiitake.jpg');
      case 'bacon':
        return require('../../assets/img/bacon.jpg');
      case 'corn':
        return require('../../assets/img/corn.jpg');
      case 'broccoli':
        return require('../../assets/img/broccoli.jpg');
      case 'bamboo':
        return require('../../assets/img/bamboo.jpg');
      default:
        break;
    }
    return false;
  }

  toggleSelect() {
    this.props.onSetIngredients(this.props.name);
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 175,
          maxWidth: '50%',
          minWidth: '50%',
        }}
      >
        <TouchableHighlight
          onPress={this.toggleSelect}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            source={this.getImageUrl(this.props.image)}
          />
        </TouchableHighlight>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 1100,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.props.selected ? this.props.color : 'rgba(20, 20, 20, 0.4)',
            opacity: this.props.selected ? 0.8 : 1,
          }}
        >
          <Text style={{
            fontFamily: this.props.fontLoaded ? 'josefin-sans-regular' : null,
            color: 'white',
            position: 'absolute',
            fontSize: 18,
          }}
          >
            {this.props.name.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
}

export default IngredientsCard;

