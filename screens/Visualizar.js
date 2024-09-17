import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Visualizar = ({ route }) => {
  const [data, setData] = useState(null);
  const { selectedDate } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(selectedDate);
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedDate]);

  if (data === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nenhum registro encontrado para esta data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Registros de {selectedDate}</Text>
      <Text style={styles.label}>Como você está se sentindo hoje:</Text>
      <Text style={styles.text}>{data.feeling}</Text>
      <Text style={styles.label}>3 coisas que você realizou hoje:</Text>
      <Text style={styles.text}>{data.accomplishments}</Text>
      <Text style={styles.label}>Algo está pesando em você:</Text>
      <Text style={styles.text}>{data.thoughts}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  message: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});

export default Visualizar;