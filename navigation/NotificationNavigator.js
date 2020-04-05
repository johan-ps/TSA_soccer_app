import React from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/headerButton';
import NotificationScreen from '../screens/NotificationsScreen';
import Colors from '../constants/colours/light_theme';

const NotificationNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={NotificationScreen} options={({route, navigation}) => ({
                title: 'Notifications',
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
                }
            })} />
        </Stack.Navigator>
    )
}

export default NotificationNavigator;