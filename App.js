import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Checkbox from 'expo-checkbox';
import Clipboard from 'expo-clipboard';

let charsetLowerCase = 'abcdefghijklmnopqrstuvwxyz';
let charsetUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let charsetNumber = '0123456789';
let charsetSpecialChar = '!@#$%&*()-+.,;?{[}]^><:';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  const [hasUpperCase, setUpperCase] = useState(false);
  const [hasLowerCase, setLowerCase] = useState(false);
  const [hasNumber, setNumber] = useState(false);
  const [hasSpecialChar, setSpecialCharacter] = useState(false);

  function getCharset() {
    let charset = '';
    if(hasUpperCase) {
      charset += charsetUpperCase;
    }

    if(hasLowerCase) {
      charset += charsetLowerCase;
    }

    if(hasNumber) {
      charset += charsetNumber;
    }

    if(hasSpecialChar) {
      charset += charsetSpecialChar;
    }

    return charset;
  };

  function generatePass() {
    let pass = '';
    let charset = getCharset();
    
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n)); 
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0)) }
        />
      </View>

      <View style={styles.area}>
        
        <View style={styles.areaCheckbox}>
          <Checkbox style={styles.checkbox} value={hasUpperCase} onValueChange={setUpperCase} />
          <Text style={styles.paragraph}>Incluir letras minúsculas</Text>
        </View>
        
        <View style={styles.areaCheckbox}>
          <Checkbox style={styles.checkbox} value={hasLowerCase} onValueChange={setLowerCase} />
          <Text style={styles.paragraph}>Incluir letras minúsculas</Text>
        </View>
        
        <View style={styles.areaCheckbox}>
          <Checkbox style={styles.checkbox} value={hasNumber} onValueChange={setNumber} />
          <Text style={styles.paragraph}>Incluir números</Text>
        </View>

        <View style={styles.areaCheckbox}>
          <Checkbox style={styles.checkbox} value={hasSpecialChar} onValueChange={setSpecialCharacter} />
          <Text style={styles.paragraph}>Incluir caracteres especiais</Text>
        </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
        </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop:10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7
  },
  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    margin: 6
  },
  areaCheckbox: {
    flexDirection: 'row'
  },
  paragraph: {
    fontSize: 15,
    marginTop: 11
  }
});
