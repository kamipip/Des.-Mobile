import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/Inicio';
import HomeScreen from './screens/HomeScreen';
import Questionario from './screens/Questionario';
import Diario from './screens/Diario';
import BreathingScreen from './screens/BreathingScreen';
import Visualizar from './screens/Visualizar';
import ExplanationScreen from './screens/ExplanationScreen';
import DeBoaNaLagoa from './screens/DeBoaNaLagoa'; 
import CitationsScreen from './screens/CitationsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Questionario" component={Questionario} />
        <Stack.Screen name="Diario" component={Diario} />
        <Stack.Screen name="BreathingScreen" component={BreathingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Visualizar" component={Visualizar} />
        <Stack.Screen name="ExplanationScreen" component={ExplanationScreen} />
        <Stack.Screen name="DeBoaNaLagoa" component={DeBoaNaLagoa} />
        <Stack.Screen name="Citações" component={CitationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
