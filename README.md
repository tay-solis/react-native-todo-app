# ART || WORK
General Assembly Web Development Immersive Final Project

By Tay Solis

ART || WORK is a mobile productivity tracter specifically built with creatives in mind.

## Running on yoru own machine
Not gonna lie, this is going to be a pain in the ass. I'd recommend [watching my demo](https://www.dropbox.com/s/ylwhg7weyob0acr/ScreenRecording_12-05-2018%2015-38-57.MP4?dl=0) instead.
1. Follow [Expo's quick start guide](https://docs.expo.io/versions/latest/).
2. Install dependencies in /TodoApp and /TodoAppServer **separately**.
3. Change rootUrl in /TodoApp/src/config/constants.js to your IP Address. Note that it just doesn't work on some wifi connections. Once I figure it our I can give you better instructions.
4. Run expo start in /TodoApp and npm run start in /TodoAppServer
5. Download the expo app on your phone. Note that there have been some updates of react-native and expo that have broken the Android emulator.
6. Scan the QR code and check out the app!

## Features

**Modular**
We know that your projects aren't just individual checkboxes Create tasks in three different categories to track your progress your way. Want to read 5 books by the end of the year? Try the Bubble Bar, which allows you to track your progress as discrete nodes. More like 500 books a year? Track your progress with a Progress Bar, where you can watch your percentage fluctuate.

**Informative**
Track your weekly progress and daily productivity patterns. Watch your progress on a single task over time.

**Intuitive**
Our clean, accessible design means that tracking your productivity isn't another chore on your to-do list!

## Technologies
- MongoDB with mongoose
- express
- JWT Auth
- React
- React Native

### Libraries
- react-native-paper
- react-native-calendars
- react-native-keyboard-aware-scroll-view
- react-native-swipe-list-view
- victory-native 

## Design
I didn't do the styling myself. Instead, I used Material's [React Native Paper library](https://callstack.github.io/react-native-paper/index.html), which comes with prestyled components and even handles themeing given a primary and secondary color.

All of the icons in the app are either provided by Expo or [Flaticon.com](https://www.flaticon.com/).

## Victories && Challenges
- To be honest, having a working mobile app is a huge boost in confidence in itself. While I do have experience working in React, I hadn't ever used React Native before this project. I expected it to be an easy jump — it's just React, right? Turns out, it's *not.* I had to dive into the deep end to get this project running the way I envisioned it. So many libraries! New names for everything! Styling without CSS! 

#### A few more specific victories: 
- **Auth on Mobile:** I've worked on auth in the browser, but mobile's system for storing is way different, and it's even different specifically for expo. When tutorials weren't enough, I had to turn to the docs to figure out what exactly was going on, and ended up with a clear and simple solution.

``` javascript
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
```

- **Sharing Data**: The user's activity needed to be tracked in the database and updated live, with the data shared through multiple parts of the app. In order to do this, I had the database track updates, and then had those updates stored in the App.js file, which then shared that update with all of the child nodes.


## For the future
I have so many stretch goals. Ultimately, I want to be able to release this app in the App Store, which will require a lot of reconfiguring and device specificity. In addition, there are many features I didn't get to:

- **Deadlines and other calendar features:** I want the user to be able to input a deadline and have it stored in the database, with calculations on how much work needs to be done in order to meet the deadline. In addition, I want this linked to the native calendar so the user can receive notifications.

- **Social Featues:** I want to implement a social feature where users can connect with friends and become "accountability partners." 

- **Regular Check-in Feature:** I want the user to be able to set an interval to check in with a habit, simply clicking the button to tell the app they have completed it either daily, weekly, monthly, or yearly. I want to implement a "streak" system as well.

- **Dark Mode:** I want to have the user be able to pick between dark and light mode, and have that information stored in the database.
