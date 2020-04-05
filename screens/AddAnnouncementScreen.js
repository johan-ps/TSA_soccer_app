import React, {useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as announcementActions from '../store/actions/announcements';
import HeaderButton from '../components/headerButton';

const imgPickerOptions = {
    title: 'Add a Photo for Your Announcement',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Select from Gallery',
};

const AddAnnounementScreen = props => { 
    const [imageUrl, setImageUrl] = useState(null);
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title='Menu' iconName='md-send' onPress={() => {
                            if (true) {
                                dispatch(announcementActions.createAnnouncement(imageUrl, caption))
                            }
                            props.navigation.goBack();
                        }} />
                    </HeaderButtons>
                )
            }
        });
    }, [props.navigation, imageUrl, caption]);

    const addImage = () => {
        ImagePicker.showImagePicker(imgPickerOptions, (response) => {
            if(response.didCancel) {
                // console.log('cancelled');
            } else if (response.error) {
                // console.log(response.error);
            } else {
                setImageUrl(response.uri);
            }
        })
    }

    const onCaptionChangeHandler = (value) => {
        setCaption(value);
    }

    return (
        <View style={styles.formWrapper}>
            <TouchableNativeFeedback onPress={addImage}>
                <View style={styles.imageUpload}>
                    {!imageUrl ?
                        <View style={styles.addImageWrapper}>
                            <Icon name="md-images" size={80} />
                            <Text style={styles.uploadText}>Add a Photo</Text>
                        </View> :
                        <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />
                    }
                </View>
            </TouchableNativeFeedback>
            <View style={styles.details}>
                <TextInput style={styles.caption} multiline={true} placeholder="Write a caption..."
                    onChangeText={onCaptionChangeHandler} value={caption}                
                >
                </TextInput>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    formWrapper: {
        margin: 10,
    },
    imageUpload: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'black'
    },
    details: {
        marginTop: 10,
    },
    addImageWrapper: {
        borderRadius: 50,
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
    },
})

export default AddAnnounementScreen;