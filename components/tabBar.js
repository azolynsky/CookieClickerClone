import React from 'react';
import {Button, View} from 'react-native';

class TabBar extends React.Component{
  render(){
    return (
      <View style={{
        flexDirection:'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        }}>
        <Button style={{flex:1,}} color="green" title="Market" onPress={() => this.props.changeView('MARKET')} />
        <Button style={{flex:1,}} color="green" title="Achievements" onPress={() => this.props.changeView('ACHIEVEMENTS')} />
      </View>
    )
  }
}

export default TabBar