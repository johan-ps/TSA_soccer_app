import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colours/light_theme';

const MaterialButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.3} >
            <View style={{backgroundColor: props.backgroundColor, ...styles.button}}>
                <Text style={{color: props.color, fontSize: props.size, ...styles.buttonText}}>{props.title.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonText: {
        fontWeight: "700"
    },
});

export default MaterialButton;