import React from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { stackActions } from '@react-navigation/native';

import HeaderButton from '../components/headerButton';
import ScheduleScreen from '../screens/ScheduleScreen';
import ScheduleItemScreen from '../screens/ScheduleItemScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import Colors from '../constants/colours/light_theme';


const ToptabNav = () => {
    const ScheduleToptabNav = createMaterialTopTabNavigator();

    return (
        <ScheduleToptabNav.Navigator tabBarOptions={{
            indicatorStyle: {color: Colors.primaryColor2, backgroundColor: Colors.primaryColor2}
        }}>
            <ScheduleToptabNav.Screen name="Weekly" component={ScheduleScreen} />
            <ScheduleToptabNav.Screen name="Calender" component={ScheduleScreen} />
        </ScheduleToptabNav.Navigator>
    )
}

const ScheduleNavigator = props => {
    const ScheduleStackNav = createStackNavigator();
    
    return (
        <ScheduleStackNav.Navigator>
            <ScheduleStackNav.Screen name="Schedule" children={ToptabNav} options={({route, navigation}) => ({
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.primaryColor1,
                },
                headerLeft: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item title='Menu' iconName='ios-menu' onPress={() => {
                                navigation.toggleDrawer();
                            }} />
                        </HeaderButtons>
                    )
                },
            })} />
            <ScheduleStackNav.Screen Navigator name="ScheduleItem" component={ScheduleItemScreen} options={({route}) => ({
                title: route.params.type,
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.primaryColor1,
                }
            })} />
            <ScheduleStackNav.Screen Navigator name="AddActivity" component={AddActivityScreen} options={({route}) => ({
                title: 'Add Activity',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.primaryColor1,
                }
            })} />
        </ScheduleStackNav.Navigator>
    )
}

export default ScheduleNavigator;