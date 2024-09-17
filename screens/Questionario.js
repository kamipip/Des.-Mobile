import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parse } from 'date-fns';

const Questionario = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const [sentimento, setSentimento] = useState('');
  const [coisasRealizadas, setCoisasRealizadas] = useState('');
  const [pensamentos, setPensamentos] = useState('');

  const handleSave = async () => {
    if (!sentimento || !coisasRealizadas || !pensamentos) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const entry = {
        sentimento,
        coisasRealizadas,
        pensamentos,
      };

      await AsyncStorage.setItem(selectedDate, JSON.stringify(entry));
      navigation.navigate('Diario');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  
  const limitWords = (text) => {
    const words = text.split(' ').slice(0, 80).join(' ');
    return words;
  };

  return (
    <ImageBackground source={require('../assets/inicio.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Questionário</Text>
          <Text style={styles.label}>Como você está se sentindo hoje?</Text>
          <TextInput
            style={styles.input}
            value={sentimento}
            onChangeText={(text) => setSentimento(limitWords(text))}
            multiline
            maxLength={80}
          />
          <Text style={styles.label}>3 coisas que você realizou hoje:</Text>
          <TextInput
            style={styles.input}
            value={coisasRealizadas}
            onChangeText={(text) => setCoisasRealizadas(limitWords(text))}
            multiline
            maxLength={80}
          />
          <Text style={styles.label}>Algo está pesando em você? Anote e deixe ir:</Text>
          <TextInput
            style={styles.input}
            value={pensamentos}
            onChangeText={(text) => setPensamentos(limitWords(text))}
            multiline
            maxLength={80}
          />
          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={handleSave} color="#388E3C" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFFCC', 
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    maxHeight: 120, 
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Questionario;
