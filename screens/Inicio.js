import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';
import { DeviceMotion } from 'expo-sensors';


const imagemFundo = require('../assets/inicio.jpg');

const Inicio = ({ navigation }) => {
  const [movimentoDispositivo, setMovimentoDispositivo] = React.useState({ x: 0, y: 0 });
  const { width, height } = Dimensions.get('window'); 

  const valorTranslateY = useSharedValue(0);

  React.useEffect(() => {
    valorTranslateY.value = withRepeat(
      withSpring(10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [valorTranslateY]);

  const estiloAnimado = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -movimentoDispositivo.x * 10 },
        { translateY: -movimentoDispositivo.y * 10 },
      ],
    };
  });

  React.useEffect(() => {
    const assinatura = DeviceMotion.addListener((dadosMovimento) => {
      setMovimentoDispositivo({
        x: dadosMovimento.rotation.gamma,
        y: dadosMovimento.rotation.beta,
      });
    });

 
    return () => {
      assinatura.remove();
    };
  }, []);

  const handleInicio = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground source={imagemFundo} style={estilos.container}>
      <Animated.View style={[estilos.overlay, estiloAnimado]}>
        <Text style={estilos.textoBoasVindas}>Você está em um lugar seguro. Vamos juntos aliviar sua ansiedade.</Text>
        <TouchableOpacity style={estilos.botao} onPress={handleInicio}>
          <Text style={estilos.textoBotao}>Começar</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textoBoasVindas: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  botao: {
    backgroundColor: '#81D4FA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  textoBotao: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Inicio;
