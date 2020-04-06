import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NotificationHeader = props => {
    return (
        <View style={styles.container}>
            <Text>Tuesday, May 14, 2020</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D8D8D8'
    }
})

export default NotificationHeader;