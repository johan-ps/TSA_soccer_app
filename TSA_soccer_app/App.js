import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import MainNavigator from './navigation/MainNavigator';
import scheduleReducer from './store/reducers/schedule';
import announcementReducer from './store/reducers/announcements';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  announcements: announcementReducer,
})
const  store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#690C10" barStyle="light-content" />
      <NavigationContainer>
        <MainNavigator></MainNavigator>
      </NavigationContainer>
    </Provider>
  )
}