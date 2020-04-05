import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import AnnouncementCard from '../components/AnnouncementCard';
import AddButton from '../components/AddButton';

const AnnouncementsScreen = props => {
    const announcements = useSelector(state => state.announcements);
    return (
        <View style={styles.announcementWrapper}>
            <FlatList
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
})

export default AnnouncementsScreen;