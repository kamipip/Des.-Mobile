import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const fundoImagem = require('../assets/inicio.jpg');
const iconeRespiracao = require('../assets/respiracao.jpg');
const iconeDiario = require('../assets/diario.jpg');
const iconeCitar = require('../assets/citar.jpg');
const iconeDeBoaNaLagoa = require('../assets/deboaa.jpg');

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={fundoImagem} style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ExplanationScreen')}
        >
          <ImageBackground source={iconeRespiracao} style={styles.image}>
            <Text style={styles.buttonText}>Respiração</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Diario')}
        >
          <ImageBackground source={iconeDiario} style={styles.image}>
            <Text style={styles.buttonText}>Diário</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Citações')}
        >
          <ImageBackground source={iconeCitar} style={styles.image}>
            <Text style={styles.buttonText}>Citações</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DeBoaNaLagoa')}
        >
          <ImageBackground source={iconeDeBoaNaLagoa} style={styles.image}>
            <Text style={styles.buttonText}>De boa na lagoa</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20, 
  },
  button: {
    width: 120,
    height: 130,
    marginHorizontal: 10, 
    elevation: 5, 
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: 'hidden', 
    borderRadius: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    width: '100%',
    paddingVertical: 5,
  },
});

export default HomeScreen;
