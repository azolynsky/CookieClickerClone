import React from 'react';
import Timer from 'react-timer-mixin';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Button
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
    this.state = {
      view: 'MARKET',
    }
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

  changeView(viewName){
    this.setState(() => {
      return { 
        view: viewName 
      }
    })
  }

  render(){
    let itemCounts = [];
    for(let key in Store.buildings){
      let item = Store.buildings[key];
      itemCounts.push(
          <Text key={key} style={{color: 'white'}}>{item.pluralDisplayName} Owned: {Store.buildings[item.name].owned}</Text>                
      )
    }

    let view = {}
    if (this.state.view === 'MARKET'){
      view = <Market items={Store.buildings} count={Store.count} buy={this.buy}/>      
    }
    else if (this.state.view === 'ACHIEVEMENTS'){
      view = <Text style={{color:'white'}}>ACHIEVEMENTS</Text>
    }

    return(
      <View style={{backgroundColor: 'black', flex: 10}}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={Styles.countDisplay} onPress={() => this.click()}>${Math.floor(Store.count)}</Text> 
        <ScrollView style={{paddingTop: 20}}> 
          {view}
          {itemCounts}
          <Text style={{color: 'pink'}}>$ per second: {Store.countPerSecond.toFixed(1)}</Text>
        </ScrollView>
        <Button title="MARKET" onPress={() => this.changeView('MARKET')} />
        <Button title="ACHIEVEMENTS" onPress={() => this.changeView('ACHIEVEMENTS')} />
      </View>
    );
  }
}

export default App