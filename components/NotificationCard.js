import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationCard = props => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon name="md-close-circle" size={40} color="#AF0000" />
            </View>
            <View style={styles.detail}>
                <Text style={styles.desc}>Practice has been cancelled this Wednesday due to inclement weather</Text>
                <Text style={styles.time}>8 min ago</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        padding: 10,
        elevation: 5
    },
    detail: {
        justifyContent: 'space-between',
        padding: 10
    },
    desc: {
        color: '#5F5F5F'
    },
    time: {
        color: '#999999'
    },
})

export default NotificationCard;