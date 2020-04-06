import React from 'react';
import {} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import AddAnnouncementScreen from '../screens/AddAnnouncementScreen';
import HeaderButton from '../components/headerButton';
import Colors from '../constants/colours/light_theme';

const AnnouncementStackNav = createStackNavigator();

const AnnouncementsNavigator = () => {
    return (
        <AnnouncementStackNav.Navigator>
            <AnnouncementStackNav.Screen name="Announcements" component={AnnouncementsScreen} options={({route, navigation}) => ({
                title: 'Announcements',
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
            <AnnouncementStackNav.Screen name="AddAnnouncement" component={AddAnnouncementScreen} options={({route, navigation}) => ({
                title: 'New Announcement',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.primaryColor1,
                },
            })} />
        </AnnouncementStackNav.Navigator>
    )
}

export default AnnouncementsNavigator;