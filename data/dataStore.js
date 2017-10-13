import {observable, action, computed} from 'mobx';
import {Alert} from 'react-native';

class dataStore {
  @observable count = 10;

  addCount(amount){
    this.count += amount
  }

  buy(itemKey) {
    for (key in this.achievements){
      let achievement = this.achievements[key];
      if (!achievement.earned && achievement.condition(itemKey)){
        Alert.alert(
          `Achievement Unlocked \n ${achievement.displayName}`,
          achievement.description,
          [
            {text: 'Sweet!'},
          ]
        )
        achievement.earned = true;
      }
    }

    this.buildings[itemKey].owned ++;
  }

  @computed get countPerSecond(){ 
    let total = 0;
    for(let key in this.buildings){
      let item = this.buildings[key]
      total += item.owned * item.countPerSecond
    };
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
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'clicker')
      }
    },
    tenClickers: {
      name: 'tenClickers',
      displayName: 'Deca-Clicker',
      description: 'Bought 10 Clickers',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'clicker' && this.buildings.clicker.owned == 9)
      }      
    },
  }
}

export default new dataStore;