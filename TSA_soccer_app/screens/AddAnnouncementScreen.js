import React, {useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, Easing } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { TextField } from 'react-native-material-textfield';

import * as announcementActions from '../store/actions/announcements';
import HeaderButton from '../components/headerButton';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import MaterialInput from '../components/MaterialInput';
import Ripple from 'react-native-material-ripple';
import Colours from '../constants/colours/light_theme';

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
    const { isEdit } = props.route.params;
    const { announcementData } = props.route.params;
    const initFormData = {
        imageUrl: isEdit && announcementData ? announcementData.imageUrl : imageUrls[Math.floor(Math.random()*8) + 1],
        desc: isEdit && announcementData ? announcementData.description : desc,
        title: isEdit && announcementData ? announcementData.title : 'Sample Title ' + Math.round(Math.random() * 1000000).toString(),
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
                                if (isEdit) {
                                    dispatch(announcementActions.updateAnnouncement(announcementData.id, title, imageUrl,
                                        caption, announcementData.date));
                                } else {
                                    dispatch(announcementActions.createAnnouncement(title, imageUrl, caption));
                                }
                            } catch (err) {
                                console.log(err);
                            }
                            props.navigation.goBack();
                        }} />
                    </HeaderButtons>
                )
            },
            title: isEdit ? 'Edit Announcement' : 'New Announcement'
        });
    }, [props.navigation, imageUrl, caption, title]);

    const items = [
        {
            name: 'House League',
            id: 0,
            children: [
            {
                name: 'Markham House League',
                id: 10,
            },
            {
                name: 'Scarborough House League',
                id: 17,
            }
            ],
        },
        {
            name: 'Rep',
            id: 1,
            children: [
                {
                    name: 'U14',
                    id: 13,
                },
                {
                    name: 'U11',
                    id: 14,
                },
                {
                    name: 'U10',
                    id: 15,
                },
                {
                    name: 'U9',
                    id: 16,
                },
            ]
        }
    ];

    const focusAnimation = new Animated.Value(0);

    const [selectedItems, setSelectedItems] = useState([]);

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

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    const onFocusInCancelImg = () => {
        Animated.timing(focusAnimation, {
            toValue: 1,
            duration: 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }

    const onFocusOutCancelImg = () => {
        Animated.timing(focusAnimation, {
            toValue: 0,
            duration: 225,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
    }

    const onCancelImgHandler = () => {
        setImageUrl(null);
    }

    const cancelImg = {
        transform: [{
            scale: focusAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
            }),
        }]
        // opacity: focusAnimation.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [1, 0.5],
        // }),
    }

    titleRef = React.createRef();

    const onSubmitTitle = () => {
        let { current: field } = titleRef;
    
        console.log(field.value());
    };

    descRef = React.createRef();

    const onSubmitDesc = () => {
        let { current: field } = descRef;
    
        console.log(field.value());
    };
    
    formatText = (text) => {
        return text;
        // return text.replace(/[^+\d]/g, '');
    };

    return (
        <View style={styles.formWrapper}>
            {/* <MultiSelectDropdown style={styles.multiSelect} /> */}
            {/* <MaterialInput placeholder="Title" onChangeText={onTitleChangeHandler} value={title} />
            <MaterialInput placeholder="Description" onChangeText={onCaptionChangeHandler} value={caption}
                multiline={true} /> */}
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Title'
                    formatText={formatText}
                    onSubmitEditing={onSubmitTitle}
                    ref={titleRef}
                    value={title}
                    tintColor="#009688"
                />
            </View>
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Description'
                    formatText={formatText}
                    onSubmitEditing={onSubmitDesc}
                    ref={descRef}
                    value={caption}
                    tintColor="#009688"
                    multiline={true}
                />
            </View>
            <SectionedMultiSelect
                items={items}
                uniqueKey="id"
                subKey="children"
                selectText="Choose teams to post to..."
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                highlightChildren={true}
                showCancelButton={true}
                showChips={false}
                selectChildren={true}
                colors={{
                    success: Colours.primaryColor1,
                    primary: Colours.primaryColor1,
                }}
            />

            <View style={styles.imagePicker}>
                {imageUrl ?
                    (<View style={styles.imagePreview}>
                        <Ripple onPressIn={onFocusInCancelImg} style={styles.closePos} onPress={onCancelImgHandler}
                            onPressOut={onFocusOutCancelImg} rippleOpacity={0}>
                            <Animated.View style={[styles.removeImage, cancelImg]}>
                                <Icon name="ios-close" color="white" size={26} />
                            </Animated.View>
                        </Ripple>
                        <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />
                    </View>) : 
                    (<Ripple style={styles.addImageRipple} onPress={addImage}>
                        <View style={styles.addImageWrapper}>
                            <Icon name="md-images" size={60} />
                            <Text style={styles.uploadText}>Add a Photo</Text>
                        </View>
                    </Ripple>)
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    formWrapper: {
        margin: 20,
    },
    textFieldContainer: {
        marginBottom: 10
    },
    multiSelect: {
        marginBottom: 10
    },
    imagePicker: {
        width: '100%',
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImageRipple: {
        height: '100%',
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderStyle: "dashed",
        borderRadius: 5,
        borderWidth: 2,
        flexDirection: 'row',
    },
    addImageWrapper: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 5,
    },
    removeImage: {
        width: 40,
        height: 40,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',        
        borderRadius: 50,
        overflow: 'hidden'
    },
    closePos: {
        position: 'absolute',
        top: -18,
        right: -18,
        zIndex: 10,
    },
    details: {
        marginTop: 10,
    },
    uploadText: {
        fontSize: 20,
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
        height: '100%',
    },
})

export default AddAnnounementScreen;