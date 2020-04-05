import React from 'react';
import { View, Text } from 'react-native';

import NotificationCard from '../components/NotificationCard';
import NotificationHeader from '../components/NotificationHeader';

const NotificationsScreen = props => {
    return (
        <View>
            <NotificationHeader />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
        </View>
    );
};

export default NotificationsScreen;