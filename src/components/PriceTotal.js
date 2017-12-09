import React from 'react';
import glamorous from 'glamorous-native';

import { Text } from 'react-native';

const TotalWrapper = glamorous.view({
  padding: 0,
  margin: 0,
});

const PriceTotal = props => (
  <TotalWrapper className="order-list">
    <Text
      style={{
      fontFamily: props.fontLoaded ? 'josefin-sans-regular' : null,
      color: 'white',
      }}
    >
      {props.total === 0 ? props.order : `Total = ${props.total}€`}
    </Text>
  </TotalWrapper>
);

export default PriceTotal;

