import React from 'react';
import { } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ScheduleNavigator from './ScheduleNavigator';
import AnnouncementNavigator from './AnnouncementsNavigator';
import Colors from '../constants/colours/light_theme';

const HomeBottomTabNav = createMaterialBottomTabNavigator();

const HomeScreen = props => {
    return (
        <HomeBottomTabNav.Navigator activeColor={Colors.primaryColor1} inactiveColor={Colors.disabled} 
            barStyle={{ backgroundColor: 'white' }} initialRouteName='Schedule'
        >
            <HomeBottomTabNav.Screen name="Help" children={AnnouncementNavigator} options={{
                tabBarLabel: 'Help',
                tabBarIcon: ({focused, color}) => (
                    <Icon name="md-help-circle-outline" size={20} color={color} />
                ),
            }} />
            <HomeBottomTabNav.Screen name="Announcements" children={AnnouncementNavigator} options={{
                tabBarLabel: 'Announcements',
                tabBarIcon: ({focused, color}) => (
                    <Icon name="md-paper" size={20} color={color} />
                ),
            }} />
            <HomeBottomTabNav.Screen name="Schedule" children={ScheduleNavigator} options={{
                tabBarLabel: 'Schedule',
                tabBarIcon: ({focused, color}) => (
                    <Icon name="md-calendar" size={20} color={color} />
                ),
            }} />
        </HomeBottomTabNav.Navigator>
    )
}

export default HomeScreen;