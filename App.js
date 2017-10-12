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
import TabBar from './components/tabBar';

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
        {/* <Text style={{color: 'pink'}}>$ per second: {Store.countPerSecond.toFixed(1)}</Text> */}
        <ScrollView style={{paddingTop: 20}}>
          <Text style={{fontSize:30, color:'white', fontWeight:'bold'}}>{this.state.view}</Text>
          {view}
        </ScrollView>
        <TabBar changeView={this.changeView.bind(this)} />
      </View>
    );
  }
}

export default App