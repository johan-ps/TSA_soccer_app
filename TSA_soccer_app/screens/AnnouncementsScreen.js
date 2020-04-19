import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons'

import MaterialButton from '../components/MaterialButton';
import AnnouncementCard from '../components/AnnouncementCard';
import AddButton from '../components/AddButton';
import * as announcementActions from '../store/actions/announcements';
import Colors from '../constants/colours/light_theme';
import HeaderButton from '../components/headerButton';

const AnnouncementsScreen = props => {
    const [error, setError]  = useState(false);
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
    }, [dispatch, setIsLoading, setError, setIsRefreshing]);

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

    _menu = null;

    setMenuRef = ref => {
        _menu = ref;
    };

    hideMenu = () => {
        _menu.hide();
    };

    showMenu = () => {
        _menu.show();
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item title='Menu' iconName='md-search' onPress={() => {}} />
                        </HeaderButtons>
                        <Menu
                            ref={setMenuRef}
                            button={<HeaderButtons HeaderButtonComponent={HeaderButton}>
                                        <Item title='Menu' iconName='md-more' onPress={showMenu} />
                                    </HeaderButtons>}
                        >
                            <MenuItem onPress={hideMenu}>Sort</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={hideMenu}>Filter</MenuItem>
                        </Menu>
                    </View>
                )
            },
        });
    }, [props.navigation]);

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
                <Text style={{fontSize: 18, marginBottom: 10}}>No announcements found.</Text>
                <Button title="Try Again" size={20} color={Colors.primaryColor2} onPress={loadAnnouncements} />
                <AddButton onPress={() => {
                    props.navigation.navigate('AddAnnouncement', {isEdit: false, announcementData: null});
                }} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{fontSize: 18, marginBottom: 10}}>An error occured.</Text>
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
                props.navigation.navigate('AddAnnouncement', {isEdit: false, announcementData: null});
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