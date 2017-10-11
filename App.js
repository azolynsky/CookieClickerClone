import React from 'react';
import Timer from 'react-timer-mixin';
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';
import {observer} from 'mobx-react';

import Store from './data/dataStore';
import CostCalculator from './classes/costCalculator';
import Market from './components/market';

Buildings = Store.buildings;

@observer
class App extends React.Component{
  constructor(props){
    super(props);
    //this.store = Store;
    this.buy = this.buy.bind(this);
    this.click = this.click.bind(this);
    this.timerInterval = 50;
  }

  componentDidMount(){
    Timer.setInterval(
      () => { 
        Store.addCount( 
          this.countPerSecond() / 20
        );
      }, 
      this.timerInterval
    );
  }

  countPerSecond(){ 
    let total = 0;
    for(let key in Buildings){
      let item = Buildings[key]
      total += item.owned * item.countPerSecond
      console.log(key, item.owned, item.countPerSecond)
    };
    console.log(total)
    return total;
  }

  buy(cost, itemName){
    Store.addCount(cost * -1);
    Store.buy('clicker');
  }

  click(){
    let amount = this.countPerSecond() * 0.1 + 1
    Store.addCount(amount)
  }

  render(){
    let itemCounts = [];
    for(let key in Buildings){
      let item = Buildings[key];
      itemCounts.push(
          <Text key={key} style={{color: 'white'}}>{item.pluralDisplayName} Owned: {Buildings[item.name].owned}</Text>                
      )
    }

    return(   
      <View style={{backgroundColor: 'black', flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={{textAlign: 'center', fontSize: 36, color: 'white', backgroundColor:'green', paddingTop:50, paddingBottom:20}} onPress={() => this.click()}>${Math.floor(Store.count)}</Text> 
        <ScrollView style={{paddingTop: 20}}> 
          <Market items={Buildings} count={Store.count} buy={this.buy}/>
          {itemCounts}
          <Text style={{color: 'pink'}}>$ per second: {this.countPerSecond().toFixed(1)}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default App