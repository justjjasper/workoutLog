import { View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { LOCALTUNNEL } from '../../config';
import { useDispatch } from 'react-redux';
import { loginEmailAddress, toggleAuthenticateLogin } from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// TO DO: Implement Action of authentication to true
export default function Login () {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [show, setShow] = useState<boolean>(true);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleLogin = async () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(emailAddress)) {
      Alert.alert('Please use a valid emaill address!');
    } else if (!password) {
      Alert.alert('Please input a password!')
    } else {

      const payload = {
        emailAddress,
        password
      };

      try {
        const token = await axios.post(`${LOCALTUNNEL}/login`, payload);

        try {
          await AsyncStorage.setItem('jwtToken', token.data);
          console.log('jwt Token stored successfully within AsyncStorage')
        } catch(err) {
          console.error('Error in storing jwt Token within AsyncStorage')
        }

        dispatch(loginEmailAddress(emailAddress));
        dispatch(toggleAuthenticateLogin())
      } catch(err) {

        if ((err as any).response.status === 404) {
          return Alert.alert('Email address not found. Please check your email or sign up for a new account.')
        }

        if ((err as any).response.status === 401) {
          return Alert.alert('Incorrect Password')
        }
        console.error('Error in logging in from client side', err);
      }

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>Log In to FitLog+</Text>

      <View style={styles.form}>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText= {setEmailAddress}
            value= {emailAddress}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry= {show}
            onChangeText= {setPassword}
            value= {password}
          />
          <TouchableOpacity
            style={styles.showTextContainer}
            onPress={() => setShow(!show)}
          >
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
         </View>

      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={{fontSize: 18}}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sign Up Page')}
        >
          <Text style={styles.signUpText}> Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E5E3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    color: '#77C7E8',
    fontSize: 18
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  form : {
    height: '45%',
    width: '90%',
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  text: {
    color: '#565758',
    fontSize: 18,
    paddingBottom: 25
  },
  titleText: {
    fontSize: 32,
    bottom: 60,
    paddingLeft: 20
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18
  },
  emailContainer: {
    width: '80%',
  },
  passwordContainer: {
    width: '80%',
    bottom: 9
  },
  showTextContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 40
  },
  showText: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#565758'
  },
  loginButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#AFDBE1',
    borderRadius: 25,
    alignSelf: 'center'
  },
  loginContainer: {
    width: '80%'
  },
  loginText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#77C7E8'
  }

})