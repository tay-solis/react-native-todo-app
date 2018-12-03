import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveKey(key, value) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async loadJWT() {
        try {
          const value = await AsyncStorage.getItem('id_token');
          const user = await AsyncStorage.getItem('currentUser');
          if (value !== null) {
            this.setState({
              jwt: value,
              currentUser: user,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token')
          .then(
            () => {
              this.setState({
                jwt: '',
                currentUser: {}
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    }
};

export default deviceStorage;