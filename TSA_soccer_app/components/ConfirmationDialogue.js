import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/colours/light_theme';
import MaterialButton from './MaterialButton';
import Ripple from 'react-native-material-ripple';

const ConfirmationDialogue = props => {
    return (
        <View>
            <Modal animatedType="none" transparent={true} visible={props.visible}
                onRequestClose={props.onCancelHandler()} presentationStyle="overFullScreen" >
                    <View style={styles.modalOuterContainer}>
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Confirm</Text>
                                <Ripple style={styles.closeIcon} onPress={props.onCancelHandler()}>
                                    <Icon name="md-close" color="white" size={20} />
                                </Ripple>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.iconWrapper}>
                                    <Icon name="ios-warning" size={50} color={Colors.primaryColor1} />
                                </View>
                                <View style={styles.bodyTextWrapper}>
                                    <Text style={styles.bodyText} >
                                        Are you sure you want to delete this announcement? You can't undo this action.
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <MaterialButton color={Colors.primaryColor1} size={16} title="No"
                                    onPress={props.onCancelHandler()} />
                                <MaterialButton color={Colors.primaryColor1} size={16} title="Yes"
                                    onPress={props.onConfirmHandler()} />
                            </View>
                        </View>
                    </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalOuterContainer: {
        backgroundColor: '#00000010',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        backgroundColor: "#f9fafb",
        width: "80%",
        borderRadius: 5,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.primaryColor1
    },
    headerText: {
        color: '#ffffff'
    },
    closeIcon: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden'
    },
    body: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20
    },
    bodyTextWrapper: {
        padding: 5,
        marginLeft: 10,
    },
    bodyText: {
        fontSize: 15
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'black'
    }
});

export default ConfirmationDialogue;