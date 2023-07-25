import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

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
            />
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            />
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry= {showPW1}
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
