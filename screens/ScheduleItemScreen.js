import React from 'react';
import { View, Text } from 'react-native';

const ScheduleItemScreen = props => {
    return (
        <View>
            <Text>{props.route.params.type}</Text>
        </View>
    )
}

export default ScheduleItemScreen;