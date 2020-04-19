import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colours from '../constants/colours/light_theme';
import Ripple from 'react-native-material-ripple';

const AddButton = props => {
    const focusAnimation = new Animated.Value(0);

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

    const scale = {
        transform: [{
            scale: focusAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.99],
            }),
        }]
    }

    const buttonStyle = {
        backgroundColor: Colours.primaryColor1,
        opacity: focusAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
        }),
    };

    return (
        // <TouchableNativeFeedback onPress={props.onPress} useForeground={true}  >
        //     <View style={[styles.addBtnOld]}>
        //         <Icon name="ios-add" color="white" size={34} />
        //     </View>
        // </TouchableNativeFeedback>

        <Ripple style={[styles.ripple]} onPress={props.onPress}
            onPressIn={onFocusIn} onPressOut={onFocusOut} >
                <Animated.View style={[styles.addBtn, buttonStyle, scale]}>
                    <Icon name="ios-add" color="white" size={28} />
                </Animated.View>
        </Ripple>
    )
}


const styles = StyleSheet.create({
    ripple: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'space-around',
        overflow: 'hidden',
        position: 'absolute',
        bottom: 25,
        right: 25,
        elevation: 10,
        shadowRadius: 10,
        shadowColor: '#F02A4B',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtn: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
})

export default AddButton;