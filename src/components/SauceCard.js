import React from 'react';
import glamorous from 'glamorous-native';

import { Text, Image, View, TouchableHighlight } from 'react-native';

const CardWrapper = glamorous.view(
  {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  props => ({
    position: props.opened ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    height: props.opened ? '100%' : '25%',
    zIndex: props.opened ? 1000 : 0,
    justifyContent: props.opened ? 'space-between' : 'center',
  }),
);

class SauceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };

    this.toggleSelect = this.toggleSelect.bind(this);
    this.openCard = this.openCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
  }

  getImageUrl(image) {
    switch (image) {
      case 'yakisoba':
        return require('../../assets/img/yakisoba.jpg');
      case 'peanut':
        return require('../../assets/img/peanut.jpg');
      case 'oyster':
        return require('../../assets/img/oyster.jpg');
      case 'chili':
        return require('../../assets/img/chili.jpg');
      default:
        break;
    }
    return false;
  }

  toggleSelect() {
    this.props.onSetSauceFood(this.props.name, this.props.price);
  }

  openCard() {
    this.setState(() => ({
      opened: true,
    }));
  }

  closeCard() {
    this.setState(() => ({
      opened: false,
    }));
  }

  render() {
    let cardText = null;
    let cardPrice = null;
    let choiceAccept = null;

    if (this.state.opened) {
      cardText = <Text style={{ fontFamily: 'josefin-sans-regular', padding: 20, marginTop: 40 }}>{this.props.text}</Text>;
      cardPrice = <Text style={{ fontFamily: 'josefin-sans-regular', fontSize: 20, color: 'green' }}>{this.props.price.toFixed(2)}€</Text>;
      choiceAccept = (
        <TouchableHighlight
          onPress={() => {
            this.closeCard();
            this.toggleSelect();
          }}
          style={{
            backgroundColor: 'green',
            borderRadius: 200,
            padding: 12,
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 40,
          }}
        >
          <Text style={{ fontFamily: 'josefin-sans-regular', color: 'white' }}>✔ ORDER</Text>
        </TouchableHighlight>
      );
    }

    return (
      <CardWrapper opened={this.state.opened}>
        {this.state.opened &&
        <TouchableHighlight
          style={{
            position: 'absolute',
            zIndex: 1100,
            top: 12,
            right: 0,
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
          }}
          onPress={this.closeCard}
        >
          <Text style={{ fontSize: 20, paddingBottom: 5, color: 'white' }}>✖</Text>
        </TouchableHighlight>
        }
        <TouchableHighlight
          style={{
            position: this.state.opened ? 'relative' : 'absolute',
            width: '100%',
            top: this.state.opened ? 65 : 0,
          }}
          onPress={this.openCard}
          disable={this.state.opened}
        >
          <Image
            style={{ width: '100%', height: 220 }}
            source={this.getImageUrl(this.props.image)}
            resizeMode="cover"
          />
        </TouchableHighlight>
        <View
          pointerEvents="none"
          style={{
            backgroundColor: this.state.opened ? this.props.color : this.props.selected ? this.props.color : 'rgba(20, 20, 20, 0.4)',
            position: this.state.opened ? 'absolute' : 'relative',
            opacity: this.props.selected ? 0.85 : 1,
            height: this.state.opened ? 65 : '100%',
            top: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: this.props.fontLoaded ? 'josefin-sans-regular' : null,
              fontSize: 18,
              color: 'white',
              lineHeight: this.state.opened ? 22 : 20,
              margin: 0,
            }}
          >
            {this.props.name.toUpperCase()}
          </Text>
        </View>
        {cardText}
        {cardPrice}
        {choiceAccept}
      </CardWrapper>
    );
  }
}

export default SauceCard;

