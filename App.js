//libraries
import React from 'react';
import Timer from 'react-timer-mixin';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Button,
  FlatList,
} from 'react-native';
import {observer} from 'mobx-react';
//components
import Header from './components/header';
import Market from './components/market';
import TabBar from './components/tabBar';
import Achievements from './components/achievements';
//other stuff
import Styles from './styles/styles';
import Store from './data/dataStore';
import DataManager from './data/dataManager';
import CostCalculator from './classes/costCalculator';

@observer
class App extends React.Component{
  constructor(props){
    super(props);
    this.timerInterval = 50;
    this.timerCount = 0;
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
        if (this.timerCount++ >= 100){
          DataManager.saveData();
          console.log('saved?');
          this.timerCount = 0;
        }
      }, 
      this.timerInterval
    );

    DataManager.loadData()
  }

  componentWillUnmount(){
    alert('unmounting');
    DataManager.saveData();
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
      view = <Achievements achievements={Store.achievements}/>
    }

    return(
      <View style={{backgroundColor: 'black', flex: 10}}>
        <StatusBar
          barStyle="light-content"
        />
        <Header onPress={this.click.bind(this)} val={Math.floor(Store.count)} pageName={this.state.view} countPerSecond={Store.countPerSecond.toFixed(1)}/>
        <ScrollView style={{padding: 20}}>
          {view}
        </ScrollView>
        <TabBar activeView={this.view} changeView={this.changeView.bind(this)} />
      </View>
    );
  }
}

export default App