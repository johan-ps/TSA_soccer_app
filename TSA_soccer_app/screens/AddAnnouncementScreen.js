import React, {useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as announcementActions from '../store/actions/announcements';
import HeaderButton from '../components/headerButton';
import MultiSelectDropdown from '../components/MultiSelectDropdown';

const imgPickerOptions = {
    title: 'Add a Photo for Your Announcement',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Select from Gallery',
};

const AddAnnounementScreen = props => { 
    const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui sapien, gravida at justo et, dapibus malesuada odio. Morbi eget fermentum lacus. Aenean dictum mauris nibh,`;
    const imageUrls = [
        null,
        null,
        'https://images.unsplash.com/photo-1545559054-8f4f9e855781?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1558258695-39d4595e049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1536536982624-06c1776e0ca8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1543793870-4317361ff7e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1550184816-3eeadf82295f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1549074699-3761f0ecc66a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1562873656-4fbe35b24826?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ];
    const { mode } = props.route.params;
    const { announcementData } = props.route.params;
    const initFormData = {
        imageUrl: mode === 'edit' && announcementData ? announcementData.imageUrl : imageUrls[Math.floor(Math.random()*8) + 1],
        desc: mode === 'edit'&& announcementData ? announcementData.description : desc,
        title: mode === 'edit' && announcementData ? announcementData.title : 'Sample Title ' + Math.round(Math.random() * 1000000).toString(),
    }
    const [imageUrl, setImageUrl] = useState(initFormData.imageUrl);
    const [caption, setCaption] = useState(initFormData.desc);
    const [title, setTitle] = useState(initFormData.title);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title='Menu' iconName='md-send' onPress={() => {
                            try {
                                if (mode === 'create') {
                                    dispatch(announcementActions.createAnnouncement(title, imageUrl, caption));
                                } else if (mode === 'edit') {
                                    dispatch(announcementActions.updateAnnouncement(announcementData.id, title, imageUrl,
                                        caption, announcementData.date));
                                }
                            } catch (err) {
                                console.log(err);
                            }
                            props.navigation.goBack();
                        }} />
                    </HeaderButtons>
                )
            },
            title: mode === 'edit' ? 'Edit Announcement' : 'Create Announcement'
        });
    }, [props.navigation, imageUrl, caption, title]);

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

    const onTitleChangeHandler = (value) => {
        setTitle(value);
    }

    return (
        <View style={styles.formWrapper}>
            {/* <MultiSelectDropdown style={styles.multiSelect} /> */}
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
                <TextInput style={styles.title} placeholder="Title..."
                    onChangeText={onTitleChangeHandler} value={title}                
                >
                </TextInput>
            </View>
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
        margin: 20,
    },
    multiSelect: {
        marginBottom: 10
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
    title: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
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