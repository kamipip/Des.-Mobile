import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const ExplanationScreen = ({ navigation }) => {
  const handleStartBreathing = (duration) => {
    navigation.navigate('BreathingScreen', { duration });
  };

  return (
    <ImageBackground 
      source={require('../assets/inicio.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Técnica de Respiração 4-7-8</Text>
        <Text style={styles.text}>
          A técnica de respiração 4-7-8 é uma prática eficaz para reduzir o estresse e a ansiedade.
          Inspire profundamente por 4 segundos, segure a respiração por 7 segundos e expire lentamente
          por 8 segundos.
        </Text>
        <Text style={styles.text}>Escolha o tempo para a prática:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleStartBreathing(1)}>
            <Text style={styles.buttonText}>1 minuto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleStartBreathing(5)}>
            <Text style={styles.buttonText}>5 minutos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleStartBreathing(10)}>
            <Text style={styles.buttonText}>10 minutos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: 20,
    borderRadius: 15, 
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold', 
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular', 
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#004D40', 
    borderRadius: 10, 
    marginVertical: 10, 
    elevation: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium', 
  },
});

export default ExplanationScreen;

