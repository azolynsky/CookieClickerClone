import {AsyncStorage} from 'react-native';
import Store from './dataStore';

export default class DataManager{
  static async saveData() {
    try {
      let achievements = []
      for (key in Store.achievements){
        let achievement = Store.achievements[key];
        achievements.push({key:key, earned:achievement.earned});
      }

      let buildings = []
      for (key in Store.buildings){
        let building = Store.buildings[key];
        buildings.push({key:key, owned:building.owned});
      }

      AsyncStorage.setItem('@Achievements', JSON.stringify(achievements));
      AsyncStorage.setItem('@Buildings', JSON.stringify(buildings));
      AsyncStorage.setItem('@Count', Store.count.toString());
    } catch (error) {
      console.log(error);
    }
  }

  static async loadData() {
    let value = await AsyncStorage.getItem('@Count');
    if (value !== null){
      Store.count = Number.parseFloat(value);
    }
    value = await AsyncStorage.getItem('@Buildings');
    if (value !== null){
      const buildings = JSON.parse(value);
      console.log(`loaded: ${buildings}`);
      for (building of buildings){
        Store.buildings[building.key].owned = building.owned;
      }
    }
    value = await AsyncStorage.getItem('@Achievements');
    if (value !== null){
      const achievements = JSON.parse(value);
      console.log(`loaded: ${achievements}`);
      for (achievement of achievements){
        Store.achievements[achievement.key].earned = achievement.earned;
      }
    }

    //console.log(error);
  }
}
