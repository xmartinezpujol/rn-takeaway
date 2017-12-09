import React from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';

class SizeCard extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSelect = this.toggleSelect.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl(image) {
    switch (image) {
      case 'small':
        return require('../../assets/img/small.jpg');
      case 'big':
        return require('../../assets/img/big.jpg');
      default:
        break;
    }
    return false;
  }

  toggleSelect() {
    this.props.onSetSizeFood(this.props.name, this.props.price);
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%',
        }}
      >
        <TouchableOpacity
          onPress={this.toggleSelect}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.props.selected ? this.props.color : 'grey',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{ marginTop: 50, width: 220, height: 220 }}
            source={this.getImageUrl(this.props.image)}
          />
        </TouchableOpacity>
        <Text style={{
          fontFamily: this.props.fontLoaded ? 'josefin-sans-regular' : null,
          color: 'white',
          position: 'absolute',
          fontSize: 18,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }}
        >
          {this.props.name.toUpperCase()}
        </Text>
      </View>
    );
  }
}

export default SizeCard;

