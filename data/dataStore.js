import {observable, action} from 'mobx';

class dataStore {
  @observable count = 0;

  addCount(amount){
    this.count += amount
  }

  buy(itemKey) {
    this.buildings[itemKey].owned ++;
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
  }

  @observable achievements = {
    achievementsList: {
      oneClicker: {
        name: 'oneClicker',
        displayName: 'One Clicker',
        countPerSecond: 1,
        description: 'Bought a clicker',
        earned: false
      },
    }
  }
}

var store = new dataStore

export default store;