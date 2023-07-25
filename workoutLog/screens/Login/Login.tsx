import { View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function Login () {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [show, setShow] = useState<boolean>(true);

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>Log In to FitLog+</Text>

      <View style={styles.form}>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.textInput}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry= {show}
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