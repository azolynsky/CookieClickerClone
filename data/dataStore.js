import {observable, action, computed} from 'mobx';
import {Alert} from 'react-native';

class dataStore {
  @observable count = 25;

  addCount(amount){
    this.count += amount
  }

  buy(itemKey) {
    if (itemKey == 'clicker' && this.achievements.oneClicker.earned === false){
      let achievement = this.achievements.oneClicker;
      Alert.alert(
        `Achievement Unlocked \n ${achievement.displayName}`,
        achievement.description,
        [
          {text: 'Sweet!'},
        ]
      )
      this.achievements.oneClicker.earned = true;
    }

    if (itemKey == 'clicker' && this.buildings.clicker.owned == 9){
      let achievement = this.achievements.tenClickers;
      Alert.alert(
        `Achievement Unlocked \n ${achievement.displayName}`,
        achievement.description,
        [
          {text: 'Sweet!'},
        ]
      )
      this.achievements.tenClickers.earned = true;
    }

    this.buildings[itemKey].owned ++;
  }

  @computed get countPerSecond(){ 
    let total = 0;
    for(let key in this.buildings){
      let item = this.buildings[key]
      total += item.owned * item.countPerSecond
      console.log(key, item.owned, item.countPerSecond)
    };
    console.log(total)
    return total;
  }

  @observable buildings = {
    clicker: {
      name: 'clicker',
      displayName: 'Clicker',
      pluralDisplayName: 'Clickers',
      baseCost: 15,
      color: 'red',
      countPerSecond: 1,
      owned: 0
    },
    mine: {
      name: 'mine',
      displayName: 'Mine',
      pluralDisplayName: 'Mines',
      baseCost: 100,
      color: 'red',
      countPerSecond: 2,
      owned: 0
    },
    tower: {
      name: 'tower',
      displayName: 'Tower',
      pluralDisplayName: 'Towers',
      baseCost: 1100,
      color: 'red',
      countPerSecond: 8,
      owned: 0
    },
  }

  @observable achievements = {
    oneClicker: {
      name: 'oneClicker',
      displayName: 'One Clicker',
      description: 'Bought a Clicker',
      earned: false
    },
    tenClickers: {
      name: 'tenClickers',
      displayName: 'Deca-Clicker',
      description: 'Bought 10 Clickers',
      earned: false
    },
  }
}

export default new dataStore;