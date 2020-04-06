import React from 'react';
import {} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeNavigator';
import TeamsScreen from '../screens/TeamsScreen';
import NotificationNavigator from './NotificationNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/Settings';
import Colours from '../constants/colours/light_theme';

const Drawer = createDrawerNavigator();

const MyDrawer = props => {
    return (
        <Drawer.Navigator drawerStyle={{backgroundColor: 'white'}}
            drawerContentOptions={{
                activeTintColor: Colours.primaryColor1,
                activeBackgroundColor: 'mistyrose',
                itemStyle: { borderRadius: 0 },
            }}
        >      
            <Drawer.Screen name="Home" children={HomeScreen} options={{
                drawerLabel: 'Home',
                drawerIcon: ({focused, color}) => (
                    <Icon name="md-home" size={20} color={color} />
                ),
            }} />
            <Drawer.Screen name="Teams" component={TeamsScreen} options={{
                drawerLabel: 'Teams',
                drawerIcon: ({focused, color}) => (
                    <Icon name="md-people" size={20} color={color} />
                )
            }} />
            <Drawer.Screen name="Notifications" children={NotificationNavigator} options={{
                drawerLabel: 'Notifications',
                drawerIcon: ({focused, color}) => (
                    <Icon name="md-notifications" size={20} color={color} />
                )
            }} />
            <Drawer.Screen name="Settings" component={SettingsScreen} options={{
                drawerLabel: 'Settings',
                drawerIcon: ({focused, color}) => (
                    <Icon name="md-settings" size={20} color={color} />
                )
            }} />
        </Drawer.Navigator>
    )
}

export default MyDrawer;