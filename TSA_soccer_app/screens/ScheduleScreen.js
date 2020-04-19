import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback, ActivityIndicator, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useFocusEffect} from '@react-navigation/native';

import ScheduleItem from '../components/ScheduleItem';
import Colours from '../constants/colours/light_theme';
import HeaderButton from '../components/headerButton';
import AddButton from '../components/AddButton';
import * as activityActions from '../store/actions/schedule';
import Colors from '../constants/colours/light_theme';

const ScheduleScreen = props => {
    const [error, setError]  = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const schedule = useSelector(state => state.schedule);
    const dispatch = useDispatch();

    const loadActivities = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(activityActions.getActivities())
        } catch (err) {
            setError(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError, setIsRefreshing]);

    useFocusEffect(
        useCallback(() => {
            const loadActivitiesOnFocus = loadActivities;
            return () => loadActivitiesOnFocus();
        }, [loadActivities])
    )

    useEffect(() => {
        setIsLoading(true);
        loadActivities().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadActivities]);
    
    let color = '#707070', icon = 'md-help-circle-outline';

    const init = (status) => {
        status = status.toLowerCase();
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

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryColor1} />
            </View>
        )
    };

    if (!isLoading && schedule.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={{fontSize: 18, marginBottom: 10}}>No activities found.</Text>
                <Button title="Try Again" size={20} color={Colors.primaryColor2} onPress={loadActivities} />
                <AddButton onPress={() => {
                    props.navigation.navigate('AddActivity', {isEdit: false, activityData: null});
                }} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{fontSize: 18, marginBottom: 10}}>An error occured. {error}</Text>
                <Button title="Reload page" onPress={loadActivities} color={Colors.primaryColor1} />
            </View>
        )
    }

    return (
        <View style={{backgroundColor: '#F5F5F5'}}>
            <FlatList
                onRefresh={loadActivities}
                refreshing={isRefreshing}
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
            <AddButton onPress={() => {
                props.navigation.navigate('AddActivity', {isEdit: false, activityData: null});
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    scheduleWrapper: {
        width: '100%',
        padding: 15,
        height: '100%',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ScheduleScreen;