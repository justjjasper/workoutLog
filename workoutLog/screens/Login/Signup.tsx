import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { LOCALTUNNEL } from '../../config';
import axois from 'axios';
import e from 'express';

// Title

// Full Name
// email
// passsword
// confirm password

// Create Account

export default function Signup () {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showPW1, setShowPw1] = useState<boolean>(true);
  const [showPW2, setShowPw2] = useState<boolean>(true);


  const [name, setName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const handleSignUp = async () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!name || !emailAddress || !password1 || !password2) {
      Alert.alert('Uh-oh! It looks like you missed a few fields.')
    } else if (!emailRegex.test(emailAddress)) {
      Alert.alert('Invalid email address!');
    } else if (password1 !== password2) {
      Alert.alert('Passwords do not match!');
    } else {
      // Proceed with sign-up logic
      // axios.post(...); // You can send data to the backend here
      const payload = {
        name,
        emailAddress,
        password1
      };
      try {
        await axois.post(`${LOCALTUNNEL}/signUp`, payload);
        Alert.alert('Successfully created an account. Check your email to confirm and activate your account!')
        navigation.navigate('Login');
      } catch (err) {
        if ((err as any).response.data) {
          Alert.alert('An account with the email provided already exists.')
        };

        console.error('Error in signing up from client side', err);
      }
    };

  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 32}}>Create Account</Text>
        <Text style={styles.text}>Please fill the input below here</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText = {setName}
            value={name}
            />
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setEmailAddress}
            value={emailAddress}
            />
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry= {showPW1}
            onChangeText={setPassword1}
            value= {password1}
          />
          <TouchableOpacity
            style={styles.showTextContainer}
            onPress={() => setShowPw1(!showPW1)}
          >
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry= {showPW2}
            onChangeText= {setPassword2}
            value= {password2}
          />
          <TouchableOpacity
            style={styles.showTextContainer}
            onPress={() => setShowPw2(!showPW2)}
          >
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.footerContainer}>
        <Text style={{fontSize: 18}}>Already have an account?</Text>
        <TouchableOpacity
          onPress= {() => navigation.navigate('Login')}
        >
          <Text style={{color: '#77C7E8', fontSize: 18}}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#E4E5E3',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  titleContainer: {
    alignItems: 'center',
    top: 20
  },
  formContainer: {
    width: '90%',
    height: '45%',
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    bottom: 50
  },
  text: {
    color: '#565758',
    fontSize: 18,
  },
  textInputContainers: {
    width: '80%'
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    paddingTop: 10
  },
  showTextContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 25
  },
  showText:{
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#565758',
  },
  signUpContainer: {
    width: '80%'
  },
  signUpButton: {
    height: 50,
    width: '80%',
    backgroundColor: '#AFDBE1',
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  signUpText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  footerContainer:{
    flexDirection: 'row',
    bottom: 100
  }
})
