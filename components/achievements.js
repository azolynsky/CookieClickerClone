import React from 'react';
import {Button, Text, View} from 'react-native';
import CostCalculator from '../classes/costCalculator';

class Achievements extends React.Component{
  cost(itemName){
    let item = this.props.items[itemName];
    return CostCalculator.getCost(item.owned, item.baseCost);
  }

  render(){
    let achievements = this.props.achievements
    let returnView = [];
    
    for (let key in achievements){
      let achievement = achievements[key];
      let value = '??????'
      if (achievement.earned) value = `${achievement.displayName}: ${achievement.description}`

      returnView.push(
        <Text style={{color:'white'}} key={key}>{value}</Text>
      )
    }

    return returnView;
  }
}

export default Achievements