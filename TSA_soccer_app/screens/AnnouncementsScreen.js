import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import AnnouncementCard from '../components/AnnouncementCard';
import AddButton from '../components/AddButton';
import * as announcementActions from '../store/actions/announcements';
import Colors from '../constants/colours/light_theme';

const AnnouncementsScreen = props => {
    const [error, setError]  = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const announcements = useSelector(state => state.announcements);
    const dispatch = useDispatch();

    const loadAnnouncements = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(announcementActions.getAnnouncements());
        } catch (err) {
            setError(err.message);
        }            
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useFocusEffect(
        useCallback(() => {
            const loadAnnouncementsOnFocus = loadAnnouncements;
            return () => loadAnnouncementsOnFocus();
        }, [loadAnnouncements])
    )

    useEffect(() => {
        setIsLoading(true);
        loadAnnouncements().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadAnnouncements]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryColor1} />
            </View>
        )
    };

    if (!isLoading && announcements.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No announcements found.</Text>
                <AddButton onPress={() => {
                    props.navigation.navigate({name: 'AddAnnouncement'});
                }} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured.</Text>
                <Button title="Reload page" onPress={loadAnnouncements} color={Colors.primaryColor1} />
            </View>
        )
    }

    return (
        <View style={styles.announcementWrapper}>
            <FlatList
                onRefresh={loadAnnouncements}
                refreshing={isRefreshing}
                data={announcements}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={itemData => {
                    return (
                        <AnnouncementCard item={itemData.item} onSelectItem={() => {}} />
                    )
                }}
            />
            <AddButton onPress={() => {
                props.navigation.navigate({name: 'AddAnnouncement'});
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    announcementWrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#CBCBCB'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AnnouncementsScreen;