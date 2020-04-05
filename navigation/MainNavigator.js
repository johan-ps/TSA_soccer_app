import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';

const MainNav = createStackNavigator();

const MainNavigator = props => {
    return (
        <MainNav.Navigator>
            {/* <MainNav.Screen name="Loading" component={LoadingScreen} options={{
                headerShown: false,
            }} />
            <MainNav.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false,
            }} /> */}
            <MainNav.Screen name="App" children={DrawerNavigator} options={{
                headerShown: false,
            }} />
        </MainNav.Navigator>
    )
}

export default MainNavigator;