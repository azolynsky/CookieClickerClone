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
          `${achievement.displayName}`,
          achievement.description,
          [
            {text: 'Nice!'},
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
      baseCost: 50,
      countPerSecond: 1,
      owned: 0
    },
    farm: {
      name: 'farm',
      displayName: 'Farm',
      pluralDisplayName: 'Farms',
      baseCost: 1100,
      countPerSecond: 8,
      owned: 0
    },
    mine: {
      name: 'mine',
      displayName: 'Mine',
      pluralDisplayName: 'Mines',
      baseCost: 12000,
      countPerSecond: 47,
      owned: 0
    },
    factory: {
      name: 'factory',
      displayName: 'Factory',
      pluralDisplayName: 'Factories',
      baseCost: 130000,
      countPerSecond: 260,
      owned: 0
    },
    bank: {
      name: 'bank',
      displayName: 'Bank',
      pluralDisplayName: 'Banks',
      baseCost: 1400000,
      countPerSecond: 1400,
      owned: 0
    },
    temple: {
      name: 'temple',
      displayName: 'Temple',
      pluralDisplayName: 'Temples',
      baseCost: 20000000,
      countPerSecond: 7800,
      owned: 0
    },
    wizardTower: {
      name: 'wizardTower',
      displayName: 'Wizard Tower',
      pluralDisplayName: 'Wizard Towers',
      baseCost: 330000000,
      countPerSecond: 44000,
      owned: 0
    },
    shipment: {
      name: 'shipment',
      displayName: 'Shipment',
      pluralDisplayName: 'Shipments',
      baseCost: 5000000000,
      countPerSecond: 260000,
      owned: 0
    },
    alchemyLab: {
      name: 'alchemyLab',
      displayName: 'Alchemy Lab',
      pluralDisplayName: 'Alchemy Labs',
      baseCost: 75000000000,
      countPerSecond: 1600000,
      owned: 0
    },
    portal: {
      name: 'portal',
      displayName: 'Portal',
      pluralDisplayName: 'Portals',
      baseCost: 1000000000000,
      countPerSecond: 10000000,
      owned: 0
    },
    timeMachine: {
      name: 'timeMachine',
      displayName: 'Time Machine',
      pluralDisplayName: 'Time Machines',
      baseCost: 14000000000000,
      countPerSecond: 65000000,
      owned: 0
    }
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
    oneMine: {
      name: 'oneMine',
      displayName: 'All Mine',
      description: 'Bought a Mine',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'mine')
      }      
    },
    tenMines: {
      name: 'tenMines',
      displayName: 'The Thin Red Mine',
      description: 'Bought 10 Mines',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'mine' && this.buildings.mine.owned == 9)
      }      
    },
    oneTower: {
      name: 'oneTower',
      displayName: 'Tower Power',
      description: 'Bought a Tower',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'tower')
      }      
    },
    tenTowers: {
      name: 'tenTowers',
      displayName: 'Stop and Smell the Towers',
      description: 'Bought 10 Towers',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'tower' && this.buildings.tower.owned == 9)
      }      
    },
  }
}

export default new dataStore;