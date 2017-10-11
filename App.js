import React from 'react';
import Timer from 'react-timer-mixin';
import {
  Text,
  View,
  StatusBar,
  ScrollView
} from 'react-native';
import {observer} from 'mobx-react';

import Styles from './styles/styles';
import Store from './data/dataStore';
import CostCalculator from './classes/costCalculator';
import Market from './components/market';

@observer
class App extends React.Component{
  constructor(props){
    super(props);
    this.timerInterval = 50;
  }

  componentDidMount(){
    Timer.setInterval(
      () => { 
        Store.addCount( 
          Store.countPerSecond / 20
        );
      }, 
      this.timerInterval
    );
  }

  buy(cost, itemName){
    Store.addCount(cost * -1);
    Store.buy(itemName);
  }

  click(){
    let amount = Store.countPerSecond * 0.1 + 1
    Store.addCount(amount)
  }

  render(){
    let itemCounts = [];
    for(let key in Store.buildings){
      let item = Store.buildings[key];
      itemCounts.push(
          <Text key={key} style={{color: 'white'}}>{item.pluralDisplayName} Owned: {Store.buildings[item.name].owned}</Text>                
      )
    }

    return(   
      <View style={{backgroundColor: 'black', flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={Styles.countDisplay} onPress={() => this.click()}>${Math.floor(Store.count)}</Text> 
        <ScrollView style={{paddingTop: 20}}> 
          <Market items={Store.buildings} count={Store.count} buy={this.buy}/>
          {itemCounts}
          <Text style={{color: 'pink'}}>$ per second: {Store.countPerSecond.toFixed(1)}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default App