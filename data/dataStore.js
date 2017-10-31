import {observable, action, computed, extendObservable} from 'mobx'
import {Alert} from 'react-native'
import CostCalculator from '../classes/costCalculator'

class Building {
  constructor(mainStore, name, displayName, pluralDisplayName, baseCost, countPerSecond) {
    extendObservable(this, {
      owned: 1,
      get buyable() {
        return this.cost < this.mainStore.count
      }
    });
      this.mainStore = mainStore
      this.name = name
      this.displayName = displayName
      this.pluralDisplayName = pluralDisplayName
      this.baseCost = baseCost
      this.countPerSecond = countPerSecond
  }

  @action.bound
  buy(){
    this.mainStore.addCount(this.cost * -1)
    this.owned ++;
  }

  @computed get cost() {
    return (CostCalculator.getCost(this.owned, this.baseCost))
  }

  // @computed get buyable() {
  //   return this.cost < this.mainStore.count
  // }
}

class dataStore {
  @observable count = 170;
  //count = 170;

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
    for(let building of this.buildings){
      total += building.owned * building.countPerSecond
    };
    return total;
  }

  buildings = [new Building(this, 'clicker', 'Clicker', 'Clickers', 50, 1)];

  //   clicker: {
  //     name: 'clicker',
  //     displayName: 'Clicker',
  //     pluralDisplayName: 'Clickers',
  //     baseCost: 50,
  //     countPerSecond: 1,
  //     owned: 1,
  //     get cost() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost))
  //     },
  //     get buyable() {
  //       return this.cost < super.count
  //     }
  //   },
  //   farm: {
  //     name: 'farm',
  //     displayName: 'Farm',
  //     pluralDisplayName: 'Farms',
  //     baseCost: 1100,
  //     countPerSecond: 8,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   mine: {
  //     name: 'mine',
  //     displayName: 'Mine',
  //     pluralDisplayName: 'Mines',
  //     baseCost: 12000,
  //     countPerSecond: 47,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   factory: {
  //     name: 'factory',
  //     displayName: 'Factory',
  //     pluralDisplayName: 'Factories',
  //     baseCost: 130000,
  //     countPerSecond: 260,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   bank: {
  //     name: 'bank',
  //     displayName: 'Bank',
  //     pluralDisplayName: 'Banks',
  //     baseCost: 1400000,
  //     countPerSecond: 1400,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   temple: {
  //     name: 'temple',
  //     displayName: 'Temple',
  //     pluralDisplayName: 'Temples',
  //     baseCost: 20000000,
  //     countPerSecond: 7800,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   wizardTower: {
  //     name: 'wizardTower',
  //     displayName: 'Wizard Tower',
  //     pluralDisplayName: 'Wizard Towers',
  //     baseCost: 330000000,
  //     countPerSecond: 44000,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   shipment: {
  //     name: 'shipment',
  //     displayName: 'Shipment',
  //     pluralDisplayName: 'Shipments',
  //     baseCost: 5000000000,
  //     countPerSecond: 260000,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   alchemyLab: {
  //     name: 'alchemyLab',
  //     displayName: 'Alchemy Lab',
  //     pluralDisplayName: 'Alchemy Labs',
  //     baseCost: 75000000000,
  //     countPerSecond: 1600000,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   portal: {
  //     name: 'portal',
  //     displayName: 'Portal',
  //     pluralDisplayName: 'Portals',
  //     baseCost: 1000000000000,
  //     countPerSecond: 10000000,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   },
  //   timeMachine: {
  //     name: 'timeMachine',
  //     displayName: 'Time Machine',
  //     pluralDisplayName: 'Time Machines',
  //     baseCost: 14000000000000,
  //     countPerSecond: 65000000,
  //     owned: 0,
  //     get buyable() {
  //       return (CostCalculator.getCost(this.owned, this.baseCost) < this.count)
  //     }
  //   }
  // }

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
    oneFarm: {
      name: 'oneFarm',
      displayName: 'Bought the Farm',
      description: 'Bought a Farm',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'farm')
      }      
    },
    tenFarms: {
      name: 'tenFarms',
      displayName: 'After Me Lucky Farms',
      description: 'Bought 10 Farms',
      earned: false,
      condition: (itemKey) => {
        return (itemKey == 'farm' && this.buildings.farm.owned == 9)
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
  }
}

export default new dataStore;