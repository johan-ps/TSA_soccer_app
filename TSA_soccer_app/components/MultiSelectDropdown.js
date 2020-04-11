import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';

const MultiSelectDropdown = props => {
    const [modalActive, setModalActive] = useState(false);
    const [modalWidth, setModalWidth] = useState('100%');

    const measureView = event => {
        setModalWidth(event.nativeEvent.layout.width);
    }
    
    return (
        <View style={{...props.style, ...styles.container}}>
            <Ripple rippleOpacity={0.18} onPress={() => {setModalActive(true)}}>
                <View style={styles.buttonContainer} onLayout={(event) => {measureView(event)}}>
                    <Text style={styles.placeholderText}>Select teams</Text>
                    <Icon name="ios-arrow-down" size={20} color="#000000" />
                </View>
            </Ripple>

            {/* <Modal animationType="slide" visible={modalActive} onRequestClose={() => {setModalActive(false)}}
                presentationStyle="overFullScreen" transparent={true} onPress={() => {setModalActive(false)}}
            > */}
            <Animated.View style={styles.optionsOverlay}>
                {/* <View style={{...styles.modalInnerView}}>
                    <Text>Hello!!</Text>
                </View> */}
            </Animated.View>
            {/* </Modal> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 8,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    optionsOverlay: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        padding: 20,
        position: 'absolute',
        top: 40,
        zIndex: 10
    },

})

export default MultiSelectDropdown;