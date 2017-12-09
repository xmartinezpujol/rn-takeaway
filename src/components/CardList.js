import React from 'react';
import glamorous from 'glamorous-native';

import BaseCard from './BaseCard';
import SizeCard from './SizeCard';
import SauceCard from './SauceCard';
import IngredientsCard from './IngredientsCard';

import { ScrollView } from 'react-native';

const Card = glamorous.view({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  marginBottom: 50,
});

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.setBaseFood = this.setBaseFood.bind(this);
    this.setSizeFood = this.setSizeFood.bind(this);
    this.setSauceFood = this.setSauceFood.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
  }

  componentWillMount() {
    if (this.props.type === 'base') {
      this.setState(() => ({
        active: window.ClientOrder.base,
      }));
    } else if (this.props.type === 'size') {
      this.setState(() => ({
        active: window.ClientOrder.size,
      }));
    } else if (this.props.type === 'sauce') {
      this.setState(() => ({
        active: window.ClientOrder.sauce,
      }));
    } else if (this.props.type === 'ingredients') {
      this.setState(() => ({
        multactive: window.ClientOrder.ingredients,
      }));
    }
  }

  // Sets selected food as order
  setBaseFood(name) {
    // Get the selected item
    const selectedfood = this.props.data.filter(food => food.name === name);

    // Save order to JSON
    window.ClientOrder.base = selectedfood[0].name;
    window.ClientOrder.baseprice = selectedfood[0].price;

    this.setState({
      active: name,
    });

    // Update order in App
    this.props.onOrderUpdate();
  }

  // Sets selected size as order
  setSizeFood(name, price) {
    // Save size to JSON
    window.ClientOrder.size = name;
    window.ClientOrder.sizeprice = price;

    this.setState({
      active: name,
    });

    // Update order in App
    this.props.onOrderUpdate();
  }

  // Sets selected size as order
  setSauceFood(name, price) {
    // Save size to JSON
    window.ClientOrder.sauce = name;
    window.ClientOrder.sauceprice = price;

    this.setState({
      active: name,
    })

    // Update order in App
    this.props.onOrderUpdate();
  }

  // Sets selected size as order
  setIngredients(name) {
    // Get current active ingredients and save the new one
    let inglist = window.ClientOrder.ingredients;

    // Check for repeated ingredients before adding
    const ingchecklist = inglist.filter(food => food === name);

    if (ingchecklist.length === 0){
      inglist.push(name);
    } else {
      inglist = inglist.filter(food => food !== name);
    }

    this.setState({
      multactive: inglist,
    });

    window.ClientOrder.ingredients = inglist;

    // Update order in App
    this.props.onOrderUpdate();
  }

  render() {
    return (
      <Card className={this.props.type === 'ingredients' ? 'cards-multiselectlist' : 'cards-list'}>
        {/* BaseCard List */}
        {this.props.type === 'base' && this.props.data.map(item => (
          <BaseCard
            name={item.name}
            key={item.name}
            color={item.color}
            image={item.img}
            text={item.desc}
            price={item.price}
            selected={this.state.active === item.name}
            type={this.props.type}
            onSetBaseFood={this.setBaseFood}
            fontLoaded={this.props.fontLoaded}
          />
        ))}
        {/* SizeCard List */}
        {this.props.type === 'size' && this.props.data.map(item => (
          <SizeCard
            name={item.name}
            key={item.name}
            color={item.color}
            image={item.img}
            price={item.price}
            selected={this.state.active === item.name}
            type={this.props.type}
            onSetSizeFood={this.setSizeFood}
            fontLoaded={this.props.fontLoaded}
          />
        ))}
        {/* SauceCard List */}
        {this.props.type === 'sauce' && this.props.data.map(item => (
          <SauceCard
            name={item.name}
            key={item.name}
            color={item.color}
            image={item.img}
            text={item.desc}
            price={item.price}
            selected={this.state.active === item.name}
            type={this.props.type}
            onSetSauceFood={this.setSauceFood}
            fontLoaded={this.props.fontLoaded}
          />
        ))}
        {/* ingredientsCard List */}
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {this.props.type === 'ingredients' && this.props.data.map(item => (
            <IngredientsCard
              name={item.name}
              key={item.name}
              color={item.color}
              image={item.img}
              selected={this.state.multactive.filter(food => food === item.name)[0] === item.name}
              type={this.props.type}
              onSetIngredients={this.setIngredients}
              fontLoaded={this.props.fontLoaded}
            />
          ))}
        </ScrollView>
      </Card>
    );
  }
}

export default CardList;

