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
    let items = this.props.items
    let buyButtons = [];
    for (let key in items){
      let item = items[key];
      let buttonTitle = `Buy ${item.displayName} ($${Nf.formatNumber(this.cost(item.name))})`;      
      buyButtons.push(
        <Button key={key}
          onPress={() => this.props.buy(this.cost(item.name), item.name)}
          title={buttonTitle}
          color={item.color}
          disabled={this.props.count < this.cost(item.name)}
        />
      )
    }

    let itemCounts = [];
    for(let key in items){
      let item = items[key];
      itemCounts.push(
          <Text key={key} style={{color: 'white'}}>{item.pluralDisplayName} Owned: {item.owned}</Text>                
      )
    }

    return (
      <View>
        {buyButtons}
        {itemCounts}
      </View>
    )
  }
}

export default Market