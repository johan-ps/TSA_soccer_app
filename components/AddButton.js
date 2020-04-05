import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colours from '../constants/colours/light_theme';

const AddButton = props => {
    return (
        <TouchableNativeFeedback onPress={props.onPress} useForeground={true} >
            <View style={styles.addBtn}>
                <Icon name="md-add" color="white" size={25} />
            </View>
        </TouchableNativeFeedback>
    )
}


const styles = StyleSheet.create({
    addBtn: {
        backgroundColor: Colours.primaryColor1,
        width: 65,
        height: 65,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        bottom: 25,
        right: 25,
        overflow: 'hidden',
        elevation: 10,
    }
})

export default AddButton;