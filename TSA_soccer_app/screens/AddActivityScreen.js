import React, { useState, useReducer, useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import Colours from '../constants/colours/light_theme';
import Ripple from 'react-native-material-ripple';
import HeaderButton from '../components/headerButton';
import * as Util from '../Util/utilities';
import * as activityActions from '../store/actions/schedule';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (let key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid &&  updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }
    return state;
}

const formatText = (text) => {
    return text;
    // return text.replace(/[^+\d]/g, '');
};

const AddActivityScreen = props => {
    const { isEdit } = props.route.params;
    const { activityData } = props.route.params;

    const dispatch = useDispatch();

    activityRef = React.createRef();
    locRef = React.createRef();
    numRef = React.createRef();
    dateRef = React.createRef();
    timeRef = React.createRef();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            activityType: isEdit ? activityData.type : '',
            location: isEdit ? activityData.location : '',
            phoneNum: isEdit ? activityData.phoneNum : '',
            date: isEdit ? Util.prettyPrintDate(activityData.date) : '',
            time: isEdit ? Util.formatTime(activityData.date) : '',
        },
        inputValidities: {
            activityType: false,
            location: false,
            phoneNum: false,
            date: false,
            time: false,
        },
        formIsValid: false,
    });
    
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (mode === 'date') {
            const dateValue = Util.prettyPrintDate(currentDate);
            dispatchFormState({type: FORM_INPUT_UPDATE, value: dateValue, isValid: true, input: 'date'});
            dateRef.current.setValue(dateValue);
        } else if (mode === 'time') {
            const timeValue = Util.formatTime(currentDate);
            dispatchFormState({type: FORM_INPUT_UPDATE, value: timeValue, isValid: true, input: 'time'})
            timeRef.current.setValue(timeValue);
        }
    }, [dispatchFormState, date, mode, show]);

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    
    const activityType = [{
        value: 'Practice',
    }, {
        value: 'Game',
    }, {
        value: 'Celebration'
    }];

    const onChangeText = useCallback((inputId, inputValue) => {
        let inputValidity = true;
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputId})
    }, [dispatchFormState])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title='Menu' iconName='md-send' onPress={() => {
                            try {
                                console.log(formState)
                                if (isEdit) {
                                    dispatch(activityActions.updateActivity(
                                        activityData.id,
                                        formState.inputValues.activityType,
                                        'confirmed',
                                        formState.inputValues.location,
                                        formState.inputValues.phoneNum,
                                        date
                                    ));
                                } else {
                                    dispatch(activityActions.createActivity(
                                        formState.inputValues.activityType,
                                        'confirmed',
                                        formState.inputValues.location,
                                        formState.inputValues.phoneNum,
                                        date
                                    ));
                                }
                            } catch (err) {
                                console.log(err);
                            }
                            props.navigation.goBack();
                        }} />
                    </HeaderButtons>
                )
            },
            title: mode === 'edit' ? 'Edit Announcement' : 'New Announcement'
        });
    }, [props.navigation, formState]);

    return (
        <View style={styles.formWrapper}>
            {/* <View style={styles.textFieldContainer}>
                <Dropdown
                    label='Activity Type'
                    data={activityType}
                />
            </View> */}
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Activity Type (ie. practice, game, etc.)'
                    formatText={formatText}
                    ref={activityRef}
                    tintColor="#009688"
                    onChangeText={onChangeText.bind(this, 'activityType')}
                    value={formState.inputValues.activityType}
                />
            </View>
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Location'
                    formatText={formatText}
                    ref={locRef}
                    tintColor="#009688"
                    onChangeText={onChangeText.bind(this, 'location')}
                    value={formState.inputValues.location}
                />
            </View>
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Phone Number'
                    formatText={formatText}
                    ref={numRef}
                    tintColor="#009688"
                    onChangeText={onChangeText.bind(this, 'phoneNum')}
                    value={formState.inputValues.phoneNum}
                />
            </View>
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Date'
                    formatText={formatText}
                    ref={dateRef}
                    tintColor="#009688"
                    onChangeText={onChangeText.bind(this, 'date')}
                    value={formState.inputValues.date}
                />
                <View style={styles.inputIcon}>
                    <TouchableOpacity activeOpacity={0.4} onPress={showDatepicker}>
                        <Icon name="md-calendar" color="grey" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textFieldContainer}>
                <TextField 
                    label='Time'
                    formatText={formatText}
                    ref={timeRef}
                    tintColor="#009688"
                    onChangeText={onChangeText.bind(this, 'time')}
                    value={formState.inputValues.time}
                />
                <View style={styles.inputIcon}>
                    <TouchableOpacity activeOpacity={0.4} onPress={showTimepicker}>
                        <Icon name="md-time" color="grey" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textFieldContainer}>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    formWrapper: {
        margin: 20,
    },
    textFieldContainer: {
        marginBottom: 0,
    },
    inputIcon: {
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        top: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});

export default AddActivityScreen;