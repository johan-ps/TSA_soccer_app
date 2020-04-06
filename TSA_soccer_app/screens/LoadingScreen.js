import React from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import Colors from '../constants/colours/light_theme';

const LoadingScreen = props => {
    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('Auth') }}>
                <RadialGradient style={{width: '100%',height: '100%'}}
                            colors={['#7B7A7A', '#454444']}
                            stops={[0.2,0.8]}
                            center={[200,300]}
                            radius={500}>
                                <View style={{width: '100%', height: '100%', margin: 30}}>
                                    <Image style={{position: 'absolute', top: -50, left: -30, width: '100%', height: '100%'}} source={require('../assets/images/CTSA_Logo.png')} resizeMode='contain' />
                                </View>
                </RadialGradient>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default LoadingScreen;