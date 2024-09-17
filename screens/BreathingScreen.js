import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';

const BreathingScreen = ({ route, navigation }) => {
  const { duration } = route.params; // Tempo selecionado (1, 5 ou 10 minutos)
  const [breathState, setBreathState] = useState('Inspire'); 
  const [seconds, setSeconds] = useState(duration * 60); // Tempo total inicial em segundos
  const animatedValue = useState(new Animated.Value(1))[0]; // Valor inicial da animação

  useEffect(() => {
    if (!duration) return; // Se não houver duração, não faça nada

    let interval;
    let cycleCount = 0; 

    const startBreathing = () => {
  
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setBreathState('Concluído');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Animação da técnica de respiração 4-7-8
      const breathingCycle = () => {

        setBreathState('Inspire');
        Animated.timing(animatedValue, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: false,
        }).start(() => {

          setBreathState('Segure');
          setTimeout(() => {

            setBreathState('Expire');
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 8000,
              useNativeDriver: false,
            }).start(() => {
              cycleCount += 1;
              if (cycleCount * 19 < duration * 60) {
                breathingCycle(); // Inicia outro ciclo de respiração
              } else {
                setBreathState('Concluído'); 
                setTimeout(() => navigation.goBack(), 2000); // Redireciona após 2 segundos
              }
            });
          }, 7000); // Aguarda 7 segundos para o próximo ciclo
        });
      };

      breathingCycle();
    };

    startBreathing();

    
    return () => {
      clearInterval(interval);
      animatedValue.stopAnimation();
    };
  }, [animatedValue, duration, navigation]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  
  const getBreathStateColor = () => {
    switch (breathState) {
      case 'Inspire':
        return '#00C853'; 
      case 'Segure':
        return '#FFD600'; 
      case 'Expire':
        return '#D50000'; 
      default:
        return '#FFFFFF'; 
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/a-respira.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Tudo ficará bem!</Text>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ scale: animatedValue }] },
          ]}
        />
        <Text style={[styles.breathState, { color: getBreathStateColor() }]}>
          {breathState}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
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
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  circle: {
    width: 86,
    height: 86,
    borderRadius: 100,
    backgroundColor: '#80CBC4',
    marginBottom: 20,
  },
  breathState: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingVertical: 10,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2, 
  },
});

export default BreathingScreen;
