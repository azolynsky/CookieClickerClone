import {observable, action, computed} from 'mobx';

class dataStore {
  @observable count = 0;

  addCount(amount){
    this.count += amount
  }

  buy(itemKey) {
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
      countPerSecond: 1,
      description: 'Bought a clicker',
      earned: false
    },
  }
}

export default new dataStore;