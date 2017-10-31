import React from 'react';
import {Button, Text, View} from 'react-native';
import CostCalculator from '../classes/costCalculator';
import Nf from '../classes/numberFormatter';

class Market extends React.Component{
  cost(itemName){
    let item = this.props.items[itemName];
    return CostCalculator.getCost(item.owned, item.baseCost);
  }

  render(){
    return(
      <Button key={this.props.key}
        //onPress={this.props.buy}
        title={this.props.buttonTitle}
        disabled={this.props.count < this.props.cost}
      />
    )
  }
}

export default Market