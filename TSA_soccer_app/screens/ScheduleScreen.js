import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ScheduleItem from '../components/ScheduleItem';
import Colours from '../constants/colours/light_theme';
import HeaderButton from '../components/headerButton';
import AddButton from '../components/AddButton';

const ScheduleScreen = props => {
    const schedule = useSelector(state => state.schedule);
    
    let color = '#707070', icon = 'md-help-circle-outline';

    const init = (status) => {
        if (status === 'pending') {
            color = "#707070";
            icon = "md-help-circle-outline";
        } else if (status === 'confirmed') {
            color = "#009C1A";
            icon = "md-checkmark-circle-outline";
        } else if (status === 'cancelled') {
            color = "#C62222";
            icon = "md-close-circle-outline";
        }
    }

    return (
        <View style={{backgroundColor: '#F5F5F5'}}>
            <FlatList
                data={schedule}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={itemData => {
                    init(itemData.item.status);
                    return (
                        <ScheduleItem item={itemData.item} color={color} icon={icon} onSelectItem={() => {
                            props.navigation.navigate('ScheduleItem', {
                                type: itemData.item.type
                            })
                        }} />
                    )
                }}  
                style={styles.scheduleWrapper} 
                contentContainerStyle={{paddingBottom: 15}}
            />
            <AddButton onPress={() => {props.navigation.navigate('AddActivity')}} />
        </View>
    );
};

const styles = StyleSheet.create({
    scheduleWrapper: {
        width: '100%',
        padding: 15,
        height: '100%',
    },
})

export default ScheduleScreen;