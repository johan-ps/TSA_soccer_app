import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Util from '../Util/utilities';

const AnnouncementCard = props => {    
    return (
        <View style={styles.container}>
            {props.item.imageUrl ?
                <View style={styles.imageContainer}> 
                    {/* <Image style={styles.image} source={require('../assets/images/kids-playing-soccer.jpg')} resizeMode='cover' /> */}
                    <Image style={styles.image} source={{uri: props.item.imageUrl}} resizeMode='cover' />
                </View> : <View></View>
            }
            <View style={styles.messageContainer}>
                <Text style={{fontSize: 14, color: 'black'}}>{props.item.description}</Text>
            </View>
            <View style={styles.statusBar}> 
                <Text style={{color: 'black'}}>{Util.getTime(props.item.date)}</Text>
                <Text style={{color: 'black'}}>Posted by <Text style={{fontWeight: 'bold'}}>{props.item.author}</Text></Text>
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
        // elevation: 8
    },
    imageContainer: {
        height: 300,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    messageContainer: {
        padding: 10
    },
    statusBar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'black',
        justifyContent: 'space-between',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default AnnouncementCard;