import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import MaterialButton from './MaterialButton';
import * as Util from '../Util/utilities';
import Colors from '../constants/colours/light_theme';
import ConfirmationDialogue from './ConfirmationDialogue';
import * as announcementActions from '../store/actions/announcements';

const AnnouncementCard = props => {    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onEditAnnouncementHandler = () => {
        const announcementData = JSON.parse(JSON.stringify(props.item));
        navigation.navigate('AddAnnouncement', {isEdit: true, announcementData: announcementData });
    }

    const onDeleteHandler = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this announcement? You can't undo this action.", [
            {text: 'No', onPress: () => {}},
            {text: 'Yes', onPress: () => {
                dispatch(announcementActions.deleteAnnouncement(props.item.id));
            }},
        ], {cancelable: true});
    }

    return (
        <View style={styles.container}>
            {props.item.imageUrl ?
                <View style={styles.imageContainer}> 
                    {/* <Image style={styles.image} source={require('../assets/images/kids-playing-soccer.jpg')} resizeMode='cover' /> */}
                    <Image style={styles.image} source={{uri: props.item.imageUrl}} resizeMode='cover' />
                </View> : <View></View>
            }
            <View style={styles.contentContainer}>
                <View style={styles.contentHeading}>
                    <View style={styles.profilePic}>
                        <Image style={styles.image} source={require('../assets/images/avatar_placeholder.png')} resizeMode='cover' />
                    </View>
                    <View style={styles.headingTitle}>
                        <Text style={styles.author}>{props.item.author}</Text>
                        <Text style={styles.title}>{props.item.title}</Text>
                    </View>
                </View>
                <View style={styles.contentBody}>
                    <Text style={styles.bodyText}>{props.item.description}</Text>
                </View>
            </View>
            <View style={styles.contentFooter}>
                <View style={styles.buttonWrapper}>
                    <MaterialButton size={14} title="Edit" color={Colors.primaryColor2} onPress={onEditAnnouncementHandler} />
                    <MaterialButton size={14} title="Delete" color={Colors.primaryColor2} onPress={onDeleteHandler} />
                </View>
                <Text style={{color: 'black'}}>{Util.getTime(props.item.date)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white', //'#F8F3F2',
        overflow: 'hidden',
        marginBottom: 10,
    },
    imageContainer: {
        height: 250,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#00000015',
        borderBottomWidth: 1,
    },
    contentHeading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40
    },
    profilePic: {
        height: 50,
        width: 50,
        borderRadius: 50,
        overflow: 'hidden'
    },
    headingTitle: {
        marginLeft: 20,
    },
    author: {
        color: 'grey',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 18,
    },
    contentBody: {
        width: '100%',
        fontSize: 14,
        marginTop: 8
    },
    bodyText: {
        fontSize: 14,
        color: '#00000099'
    },
    contentFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttonWrapper: {
        flexDirection: 'row'
    },
});

export default AnnouncementCard;