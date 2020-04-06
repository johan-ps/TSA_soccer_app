import React from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AuthScreen = props => {
    return (
        <View style={styles.container}>
            <View style={{width: 150, height: 150, margin: 30}}>
                <Image style={{position: 'absolute', top: 0, left: 0, width: 150, height: 150}} source={require('../assets/images/CTSA_Logo.png')} resizeMode='center' />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <Icon name="md-person" color="#E51B23" size={24}/>
                    <TextInput style={styles.input} placeholder="Username" autoCompleteType="username" placeholderTextColor="#e6e8eb" />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="ios-lock" color="#E51B23" size={24}/>
                    <TextInput style={styles.input} placeholder="Password" autoCompleteType="password" placeholderTextColor="#e6e8eb" />
                </View>
            </View>
            <View style={styles.button}>
                <Button title="Login" onPress={() => {
                    props.navigation.navigate('App')
                }} />
            </View>
            <View style={{alignItems: 'flex-end', width: '80%'}}>
                <Text style={{color: '#BB6853', textDecorationLine: 'underline', paddingTop: 20}}>Forgot Password</Text>
                <Text style={{color: '#BB6853', textDecorationLine: 'underline', paddingTop: 20}}>Not registered yet? Sign Up</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33435d',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#221919',
    },
    loginContainer: {
        width: '100%',
        margin: 20,
        alignItems: "center",
    },
    input: {
        marginLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 18,
        color: 'white',
        textDecorationLine: 'none'
    },
    inputContainer: {
        borderBottomColor: '#FFFFFFB3',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 0,
        width: '80%',
        marginBottom: 30,
    },
    button: {
        width: '30%',
        height: 50
    }
})

export default AuthScreen;