import React, { useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

import Colors from '../constants/colours/light_theme';
import Ripple from 'react-native-material-ripple';

const MaterialButton = props => {
    let focusAnimation = new Animated.Value(0);
    Animated.timing(focusAnimation, {
        toValue: 0,
        duration: 0, 
        useNativeDriver: true
    }).start();
    

    const onFocusIn = () => {
        Animated.timing(focusAnimation, {
            toValue: 1,
            duration: 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }

    const onFocusOut = () => {
        Animated.timing(focusAnimation, {
            toValue: 0,
            duration: 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }

    const shadeStyle = {
        backgroundColor: props.color,
        opacity: focusAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
        }),
    };

    return (
        // <TouchableOpacity onPress={props.onPress} activeOpacity={0.3} >
        //     <View style={{backgroundColor: props.backgroundColor, ...styles.button}}>
        //         <Text style={{color: props.color, fontSize: props.size, ...styles.buttonText}}>{props.title.toUpperCase()}</Text>
        //     </View>
        // </TouchableOpacity>

        <Ripple rippleColor={props.color} style={[styles.ripple]} onPress={props.onPress}
            onPressIn={onFocusIn} onPressOut={onFocusOut} >
            <Animated.Text
                style={[{color: props.color, fontSize: props.size, ...styles.buttonText}]}
                numberOfLines={1}
            >
                {props.title}
            </Animated.Text>
            <View style={styles.shadeContainer}>
                <Animated.View style={[styles.shade, shadeStyle]}>
                </Animated.View>
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    ripple: {
        borderRadius: 2,
        justifyContent: 'space-around',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    shadeContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    shade: {
        flex: 1
    },
    buttonText: {
        fontWeight: "700",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase'
    },
});

export default MaterialButton;