import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays, isBefore, isEqual, parse } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';

const Diario = ({ navigation }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [entryData, setEntryData] = useState(null);
  const currentDate = new Date();

  useEffect(() => {
    const fetchAvailableDates = async () => {
      let availableDates = [];
      try {
        for (let i = 0; i < 30; i++) { 
          const date = format(subDays(currentDate, i), 'dd/MM/yyyy');
          const storedData = await AsyncStorage.getItem(date);
          if (storedData) {
            availableDates.push(date);
          }
        }
        setDates(availableDates);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchAvailableDates();
  }, []);

  useEffect(() => {
    const fetchEntryData = async () => {
      if (selectedDate) {
        try {
          const storedData = await AsyncStorage.getItem(selectedDate);
          if (storedData) {
            setEntryData(JSON.parse(storedData));
          } else {
            setEntryData(null);
          }
        } catch (error) {
          console.error('Error fetching entry data:', error);
        }
      }
    };

    fetchEntryData();
  }, [selectedDate]);

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const handleAddEntry = () => {
    if (isBefore(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate) || isEqual(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate)) {
      navigation.navigate('Questionario', { selectedDate });
    } else {
      Alert.alert('Você não pode adicionar registros para datas futuras.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissão da câmera para funcionar!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const entry = { ...entryData, photo: result.assets[0].uri };
      await AsyncStorage.setItem(selectedDate, JSON.stringify(entry));
      setEntryData(entry);
    }
  };

  return (
    <ImageBackground source={require('../assets/inicio.jpg')} style={styles.container}>
      <FlatList
        data={dates}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dateItem}
            onPress={() => handleDatePress(item)}
          >
            <Text style={styles.dateText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: (selectedDate && (isBefore(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate) || isEqual(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate))) ? '#A5D6A7' : '#B0BEC5' }]}
        onPress={handleAddEntry}
        disabled={!(selectedDate && (isBefore(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate) || isEqual(parse(selectedDate, 'dd/MM/yyyy', new Date()), currentDate)))}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cameraButton]}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>📷</Text>
      </TouchableOpacity>

      {entryData && (
        <View style={styles.entryContainer}>
          <Text style={styles.entryTitle}>Relatório do Dia</Text>
          <Text><Text style={styles.label}>Sentimento:</Text> {entryData.sentimento}</Text>
          <Text><Text style={styles.label}>3 Coisas Realizadas:</Text> {entryData.coisasRealizadas}</Text>
          <Text><Text style={styles.label}>Pensamentos:</Text> {entryData.pensamentos}</Text>
          {entryData.photo && <Image source={{ uri: entryData.photo }} style={styles.image} />}
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  dateItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
    backgroundColor: '#FFFFFFCC', 
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: '#A5D6A7',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  cameraButton: {
    backgroundColor: '#FF9800',
    marginTop: 10,
  },
  entryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffffCC', 
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  entryTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Diario;
