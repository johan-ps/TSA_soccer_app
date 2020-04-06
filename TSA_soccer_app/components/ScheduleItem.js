import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Util from '../Util/utilities';

const ScheduleItem = props => {
    return (
        <TouchableNativeFeedback onPress={props.onSelectItem}>
            <View style={{...styles.card, borderLeftColor: props.color}}>
                <View style={styles.statusBar}>
                    <Text style={styles.date}>{Util.getDate(props.item.date)}</Text>
                    <View style={styles.status}>
                        <View style={{...styles.statusIcon, backgroundColor: props.color}}></View>
                        {/* <Icon name={props.icon} color={props.color} size={20} /> */}
                        <Text style={{...styles.statusText, color: props.color}}>{Util.formatStatus(props.item.status)}</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={{color: '#8F8F8F'}}>{props.item.type}: {Util.formatTime(props.item.date)}</Text>
                    <View style={styles.location}>
                        <View style={{marginRight: 5}}><Icon name="md-pin" color="#8F8F8F" size={20} /></View>
                        <Text style={{color: '#8F8F8F'}}>{props.item.location}</Text>
                    </View>
                </View>
                <View style={styles.moreDetails}>
                    <Text style={{marginLeft: 5, color: "#00A1D8"}}>Click for more details</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    moreDetails: {
        flexDirection: "row",
        color: '#00A1D8',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 5,
        borderLeftWidth: 5,
        padding: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },
    statusBar: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    date: {
        fontSize: 20,
        color: '#326767'
    },
    statusText: {
        fontSize: 15,
        marginLeft: 5,
        fontWeight: "600"
    },
    status: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',        
    },
    statusIcon: {
        width: 12,
        height: 12,
        borderRadius: 50,
    },
    location: {
        flexDirection: "row",
        marginLeft: 25,
    },
    details: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
    },
})

export default ScheduleItem;