import React from 'react';
import glamorous from 'glamorous-native';

import { Font } from 'expo';
import { Alert, Text, View } from 'react-native';

import food from './src/data/MockData';

import CardList from './src/components/CardList';
import PriceTotal from './src/components/PriceTotal';

const INGREDIENT_PRICE = 1.20;

window.ClientOrder = {
  base: '',
  baseprice: 0,
  size: '',
  sizeprice: 0,
  sauce: '',
  sauceprice: 0,
  ingredients: [],
};

const AppViewport = glamorous.view({
  display: 'flex',
  backgroundColor: 'black',
  height: '100%',
  width: '100%',
  paddingTop: 24,
});

const NavWrapper = glamorous.view({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'black',
  marginTop: -50,
  zIndex: 1,
  height: 70,
  width: '100%',
});

const NavArrow = glamorous.view({
  zIndex: 100,
  width: 80,
  height: '100%',
});

const NavArrowLeft = glamorous.touchableHighlight({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const NavArrowRight = glamorous.touchableHighlight({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "Let's order something!",
      total: 0,
      currentview: 1,
      fontLoaded: false,
    };

    this.orderUpdate = this.orderUpdate.bind(this);
    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'josefin-sans-bold': require('./assets/fonts/JosefinSans-Bold.ttf'),
      'josefin-sans-regular': require('./assets/fonts/JosefinSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  orderUpdate() {
    const sauceprice = window.ClientOrder.sauceprice;
    let totalprice = window.ClientOrder.baseprice * (window.ClientOrder.sizeprice === 0 ? 1
      : window.ClientOrder.sizeprice.toFixed(2))
      + (window.ClientOrder.ingredients.length * INGREDIENT_PRICE) + sauceprice;

    this.setState({
      order: window.ClientOrder.base,
      total: totalprice.toFixed(2),
    });
  }

  navigateLeft() {
    if (this.state.currentview > 1) {
      this.setState(() => ({
        currentview: this.state.currentview - 1,
      }));
    }
  }

  navigateRight() {
    switch (this.state.currentview){
      case 1:
        if (window.ClientOrder.base !== '') {
          this.setState(() => ({
            currentview: this.state.currentview + 1,
          }));
        } else {
          Alert.alert('Yo! Select a Base of Noodles or Rice!');
        }
        break;
      case 2:
        if (window.ClientOrder.size !== '') {
          this.setState(() => ({
            currentview: this.state.currentview + 1,
          }));
        } else {
          Alert.alert('Let\'s do this! Select a Size for your order.');
        }
        break;
      case 3:
        if (window.ClientOrder.ingredients.length > 0) {
          this.setState(() => ({
            currentview: this.state.currentview + 1,
          }));
        } else {
          Alert.alert('Ingredients are key, don\'t leave without selecting some!');
        }
        break;
      case 4:
        if (window.ClientOrder.sauce !== '') {
          this.setState(() => ({
            currentview: this.state.currentview + 1,
          }));
        } else {
          Alert.alert('Almost done! Please select some Sauce.');
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <AppViewport>
        {this.state.currentview === 1 &&
        <CardList
          fontLoaded={this.state.fontLoaded}
          type="base"
          data={food.base}
          onOrderUpdate={this.orderUpdate}
        />
        }
        {this.state.currentview === 2 &&
        <CardList
          fontLoaded={this.state.fontLoaded}
          type="size"
          data={food.size}
          onOrderUpdate={this.orderUpdate}
        />
        }
        {this.state.currentview === 3 &&
        <CardList
          fontLoaded={this.state.fontLoaded}
          type="ingredients"
          data={food.ingredients}
          onOrderUpdate={this.orderUpdate}
        />
        }
        {this.state.currentview === 4 &&
        <CardList
          fontLoaded={this.state.fontLoaded}
          type="sauce"
          data={food.sauce}
          onOrderUpdate={this.orderUpdate}
        />
        }
        {this.state.currentview === 5 &&
        <View
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            marginTop: -70,
            marginBottom: 50,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 26,
                fontFamily: this.state.fontLoaded ? 'josefin-sans-regular' : null,
                marginBottom: 10,
              }}
            >
             - YOUR ORDER -
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: this.state.fontLoaded ? 'josefin-sans-regular' : null,
              }}
            >
              {`${window.ClientOrder.size} ${window.ClientOrder.base} `}
              ({(window.ClientOrder.baseprice * window.ClientOrder.sizeprice).toFixed(2)} €)
            </Text>
            {window.ClientOrder.ingredients.map(ingredient => (
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: this.state.fontLoaded ? 'josefin-sans-regular' : null,
                }}
                key={ingredient}
              >
                {ingredient} ({INGREDIENT_PRICE.toFixed(2)} €)
              </Text>
            ))}
            <Text
              style={{
                fontSize: 20,
                fontFamily: this.state.fontLoaded ? 'josefin-sans-regular' : null,
              }}
            >
              {window.ClientOrder.sauce} sauce ({window.ClientOrder.sauceprice.toFixed(2)} €)
            </Text>
          </View>
        </View>
        }
        <NavWrapper>
          <NavArrow>
            {this.state.currentview !== 1 &&
              <NavArrowLeft onPress={this.navigateLeft} >
                <Text
                  style={{
                  color: 'white',
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  ◀
                </Text>
              </NavArrowLeft>
            }
          </NavArrow>
          <PriceTotal
            fontLoaded={this.state.fontLoaded}
            order={this.state.order}
            total={this.state.total}
          />
          <NavArrow>
            {this.state.currentview !== 5 &&
              <NavArrowRight onPress={this.navigateRight} >
                <Text
                  style={{
                  color: 'white',
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  ▶
                </Text>
              </NavArrowRight>
            }
          </NavArrow>
        </NavWrapper>
      </AppViewport>
    );
  }
}

export default App;
