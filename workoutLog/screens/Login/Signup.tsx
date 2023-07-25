import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';

// Title

// Full Name
// email
// passsword
// confirm password

// Create Account

export default function Signup () {
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
          />
          <TouchableOpacity
            style={styles.showTextContainer}
          >
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textInputContainers}>
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.showTextContainer}
          >
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity

        >
          <Text style={{fontSize: 20}}>Sign Up</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footerContainer}>
        <Text style={{fontSize: 18}}>Already have an account?</Text>
        <TouchableOpacity>
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

  },
  formContainer: {
    width: '90%',
    height: '55%',
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8
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
    fontSize: 18
  },
  showTextContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 15
  },
  showText:{
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#565758',
  },
  footerContainer:{
    flexDirection: 'row',
    bottom: 30
  }
})
