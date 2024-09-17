import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

const DeBoaNaLagoa = () => {
  const [isPlayingChuva, setIsPlayingChuva] = useState(false);
  const [isPlayingMeditacao, setIsPlayingMeditacao] = useState(false);

  const soundChuvaRef = useRef(null);
  const soundMeditacaoRef = useRef(null);

  const handleChuvaPress = async () => {
    if (!isPlayingChuva) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sons/chuva.mp3')
        );
        soundChuvaRef.current = sound;
        await sound.playAsync();
        setIsPlayingChuva(true);
      } catch (error) {
        console.error('Erro ao carregar o áudio de chuva', error);
      }
    } else {
      try {
        await soundChuvaRef.current.stopAsync();
        setIsPlayingChuva(false);
      } catch (error) {
        console.error('Erro ao parar o áudio de chuva', error);
      }
    }
  };

  const handleMeditacaoPress = async () => {
    if (!isPlayingMeditacao) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sons/meditacao.mp3')
        );
        soundMeditacaoRef.current = sound;
        await sound.playAsync();
        setIsPlayingMeditacao(true);
      } catch (error) {
        console.error('Erro ao carregar o áudio de meditação', error);
      }
    } else {
      try {
        await soundMeditacaoRef.current.stopAsync();
        setIsPlayingMeditacao(false);
      } catch (error) {
        console.error('Erro ao parar o áudio de meditação', error);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/a-lagoa.jpg')}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>De Boa na Lagoa</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isPlayingChuva ? styles.buttonActive : null]}
            onPress={handleChuvaPress}
          >
            <Text style={styles.buttonText}>
              {isPlayingChuva ? 'Parar Chuva' : 'Ouvir Chuva'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isPlayingMeditacao ? styles.buttonActive : null]}
            onPress={handleMeditacaoPress}
          >
            <Text style={styles.buttonText}>
              {isPlayingMeditacao ? 'Parar Meditação' : 'Ouvir Meditação'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover', 
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080', 
    borderRadius: 20,
    padding: 20,
    margin: 10,
    width: '90%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#004D40',
    borderRadius: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
  },
  buttonActive: {
    backgroundColor: '#00796B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeBoaNaLagoa;

