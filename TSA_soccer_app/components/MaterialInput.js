import React, {useEffect, useState, useRef} from 'react';
import { View, TextInput, StyleSheet, Animated, Easing, Text, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colours from '../constants/colours/light_theme';

const MaterialInput = props => {
    // const [focusAnimation, setFocusAnimation] = useState(new Animated.Value(0));
    // const [placeholderAnim, setPlaceholderAnim] = useState(new Animated.Value(props.value && (props.value.length === 0) ? 0 : 1));
    // const [errorAnim, setErrorAnim] = useState(new Animated.Value(0));
    const focusAnimation = new Animated.Value(0);
    const placeholderAnim = new Animated.Value(0);
    const errorAnim = new Animated.Value(0);
    const [placeholderVisible, setPlaceholderVisible] = useState(props.value && (props.value.length === 0) ? true : false);
    const [isFocus, setIsFocus] = useState(false);

    const animateInput = (val) => {
        Animated.timing(focusAnimation, {
            toValue: val,
            duration: val === 0 ? 0 : 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }
    const animatePlaceholder = (val) => {
        Animated.timing(placeholderAnim, {
            toValue: val,
            duration: 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }
    const animateError = (val) => {}

    // useEffect(() => {
    //     if (placeholderVisible) {
    //         placeholderAnim.setValue(0);
    //     } else {
    //         placeholderAnim.setValue(1);
    //     }
    // }, [focusAnimation, props.onChangeText]);

    const onFocusIn = () => {
        Animated.parallel([
            Animated.timing(focusAnimation, {
                toValue: 1,
                duration: 225,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),
            Animated.timing(placeholderAnim, {
                toValue: 1,
                duration: 225,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            })
        ]).start();
        // if (!isFocus) {
            // Animated.timing(focusAnimation, {
            //     toValue: 1,
            //     duration: 225,
            //     easing: Easing.out(Easing.ease),
            //     useNativeDriver: true
            // }).start();
            // animateInput(1);
            // setIsFocus(true);
        // }
        // if (placeholderVisible) {
        //     animatePlaceholder(1);
        // }
        
    }

    const onFocusOut = () => {
        Animated.parallel([
            Animated.timing(focusAnimation, {
                toValue: 0,
                duration: 1,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),
            Animated.timing(placeholderAnim, {
                toValue: 0,
                duration: 225,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            })
        ]).start();
        // if (isFocus) {
            // Animated.timing(focusAnimation, {
            //     toValue: 0,
            //     duration: 0,
            //     useNativeDriver: true
            // }).start();
            // animateInput(0);
            // setIsFocus(false);
        // }
        // if (placeholderVisible) {
        //     animatePlaceholder(0);
        // }
    }

    const color = {
        baseColor: focusAnimation.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['#B92D00', color: '#000000',, "#009688"],
        })
    }

    const underlineStyle = {
        backgroundColor: props.invalid ? '#B92D00' : "#009688",
        transform: [{
            scaleX: focusAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        }]
    }

    const placeholderTextStyle = {
        opacity: placeholderAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        }),
        transform: [
            {
                translateY: placeholderAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, -20],
                }),
            },
            {
                translateX: placeholderAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, -3],
                }),
            },
            {
                scale: placeholderAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.85],
                }),
            }
        ],
    }

    const onChangeTextHandler = (value) => {
        // if (value.length === 0) {
        //     setPlaceholderVisible(true);
        // } else {
        //     setPlaceholderVisible(false);
        // }
        props.onChangeText(value);
    }

    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={[styles.placeholderText, placeholderTextStyle, {color: color.baseColor}]}>{props.placeholder}</Animated.Text>
            <TextInput onFocus={onFocusIn} onBlur={onFocusOut} style={styles.input}
                onChangeText={onChangeTextHandler} value={props.value} multiline={props.multiline} />
            <Animated.View style={[styles.underline, underlineStyle]}></Animated.View>
            {props.invalid ?
                (<View style={styles.errorMsg}>
                    <Text style={styles.errorMsgText}>{props.errorMsg}</Text>
                    <Icon name="ios-warning" color='#B92D00' size={20} />
                </View>) :
                null
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 25  
    },
    placeholderText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto-Light',
        position: 'absolute',
        bottom: 5,
    },
    underline: {
        width: '100%',
        height: 2,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    input: {
        borderBottomColor: '#0000001F',
        borderBottomWidth: 1,
        paddingBottom: 2,
        paddingHorizontal: 0,
    },
    errorMsg: {
        color: '#B92D00',
        position: 'absolute',
        bottom: -22,
        left: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    errorMsgText: {
        color: '#B92D00',
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Roboto-Light',
    }
})

export default MaterialInput;