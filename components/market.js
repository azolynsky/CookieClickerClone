import React from 'react'
import {Button, Text, View} from 'react-native'
import CostCalculator from '../classes/costCalculator'
import Nf from '../classes/numberFormatter'
import Store from '../data/dataStore'
import {observer} from 'mobx-react';

let items = Store.buildings

@observer
class Market extends React.Component{
  shouldComponentUpdate(nextProps){
    return true
  }

  render(){
    let buyButtons = [];
    for (let item of items){
      buyButtons.push(
        <Button key={item.name}
          onPress={item.buy}
          title={`Buy ${item.displayName} ($${item.cost})`}
          disabled={!item.buyable}
        />
      )
    }

    let itemCounts = [];
    for(let item of items){
      itemCounts.push(
          <Text key={item.name} style={{color: 'white'}}>{item.pluralDisplayName} Owned: {item.owned}</Text>                
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