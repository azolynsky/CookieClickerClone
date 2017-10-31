import React from 'react'
import {View, TouchableHighlight, Text} from 'react-native'
import CostCalculator from '../classes/costCalculator'
import Nf from '../classes/numberFormatter'

class Achievements extends React.Component {
  cost (itemName) {
    let item = this.props.items[itemName]
    return CostCalculator.getCost(item.owned, item.baseCost)
  }

  render () {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{backgroundColor: 'green', paddingTop: 30}}>
          <Text style={{color: 'white', fontSize: 30, textAlign: 'center', margin: 20, fontWeight: 'bold'}}>${Nf.formatNumber(this.props.val)}</Text>
          <Text style={{color: 'white', textAlign: 'right'}}>${this.props.countPerSecond} Per Second</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default Achievements
