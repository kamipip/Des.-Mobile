import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ImageBackground, ScrollView, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';


const imagens = [
  require('../assets/sala.jpg'),
  require('../assets/natureza.jpg'),
  require('../assets/cidade.jpg'),
];


const citacoes = [
  "Acredite em si mesmo e em todo o seu potencial.",
  "Você é mais forte do que pensa.",
  "A única pessoa que pode limitar o seu sucesso é você mesmo.",
  "Seja a melhor versão de si mesmo.",
  "Confie no processo e no seu poder.",
  "Você é capaz de realizar coisas incríveis.",
  "A confiança em si mesmo é o primeiro segredo do sucesso.",
  "Não subestime o que você pode conquistar.",
  "Você é digno de todas as coisas boas que deseja.",
  "Acredite em seus sonhos e eles se tornarão realidade.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "O sucesso vem para aqueles que têm coragem de buscá-lo.",
  "Cada desafio é uma oportunidade disfarçada.",
  "Você nunca sabe quão forte é até que ser forte seja a única opção.",
  "O sucesso é resultado da preparação, do trabalho duro e da aprendizagem com o fracasso.",
  "Não espere por oportunidades, crie-as.",
  "O sucesso não é o final, o fracasso não é fatal; é a coragem de continuar que conta.",
  "Persista e os resultados virão.",
  "A jornada de mil milhas começa com um passo.",
  "O sucesso é a habilidade de ir de fracasso em fracasso sem perder o entusiasmo.",
  "A única maneira de alcançar o impossível é acreditar que é possível.",
  "As grandes conquistas exigem tempo e paciência.",
  "O fracasso é apenas a oportunidade de começar novamente, com mais inteligência.",
  "Nunca desista, grandes coisas levam tempo.",
  "O sucesso é a soma de pequenos esforços repetidos diariamente.",
  "Desafios são o que fazem a vida interessante e superá-los é o que dá sentido a ela.",
  "Se você caiu ontem, levante-se hoje.",
  "A persistência é o caminho do sucesso.",
  "Não importa quantas vezes você falhe, você só precisa acertar uma vez.",
  "Cada dificuldade é uma oportunidade para crescer.",
  "O trabalho duro supera o talento quando o talento não trabalha duro.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "A única forma de fazer um excelente trabalho é amar o que você faz.",
  "A determinação é o que faz a diferença entre o sucesso e o fracasso.",
  "A chave para o sucesso é focar nosso pensamento positivo nas coisas que desejamos, não nas coisas que tememos.",
  "O trabalho duro é o preço que devemos pagar pelo sucesso.",
  "O sucesso é a recompensa por ter se dedicado ao que você ama.",
  "Trabalhe com paixão e os resultados virão.",
  "A persistência é a base da grandeza.",
  "Se você quer algo que nunca teve, precisa estar disposto a fazer algo que nunca fez.",
  "A vida é 10% do que acontece com você e 90% de como você reage.",
  "Não conte os dias, faça os dias contarem.",
  "A vida é uma jornada, não um destino.",
  "A felicidade não é algo pronto, ela vem de suas próprias ações.",
  "A vida é feita de escolhas. Escolha ser feliz.",
  "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
  "A vida é uma aventura ousada ou não é nada.",
  "Seja a mudança que você deseja ver no mundo.",
  "Cada dia é uma nova chance para mudar sua vida.",
  "Não tenha medo de dar grandes passos. Não se pode cruzar um abismo em dois pequenos saltos.",
  "Coragem é a resistência ao medo, não a ausência do medo.",
  "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.",
  "A vida começa onde sua zona de conforto termina.",
  "A coragem não é a ausência do medo, mas a capacidade de enfrentá-lo.",
  "Não tenha medo de desistir do bom para buscar o ótimo.",
  "Às vezes, a maior coragem é a de enfrentar a própria mente.",
  "Dê o primeiro passo em fé. Você não precisa ver a escada inteira, apenas dê o primeiro passo.",
  "A única forma de encontrar o seu verdadeiro potencial é desafiando-se.",
  "Se você quer algo que nunca teve, deve estar disposto a fazer algo que nunca fez.",
  "A atitude é uma pequena coisa que faz uma grande diferença.",
  "Sonhos e Esperança",
  "Nunca é tarde demais para ser o que você poderia ter sido.",
  "Os sonhos não funcionam a menos que você trabalhe duro.",
  "Se você pode sonhar, você pode realizar.",
  "A esperança é a coisa com penas que pousa na alma.",
  "O único limite para o nosso reconhecimento de amanhã são as nossas dúvidas de hoje.",
  "Se você não tentar, nunca saberá o que poderia ter alcançado.",
  "Os sonhos são os segredos de nossas almas.",
  "A esperança é o combustível da alma.",
  "Sonhe grande e se arrisque a falhar.",
  "Seja corajoso o suficiente para viver a vida que você sonha.",
  "Equilíbrio e Bem-Estar",
  "A paz vem de dentro, não a procure à sua volta.",
  "Cuide do seu corpo. É o único lugar que você tem para viver.",
  "A saúde é a maior riqueza.",
  "Você não pode preencher o copo dos outros se o seu estiver vazio.",
  "A felicidade é a experiência de viver a vida de acordo com seus valores.",
  "Dê-se permissão para descansar. Não é um fracasso, é uma recuperação.",
  "Um momento de paz pode mudar um dia inteiro.",
  "A qualidade de sua vida depende da qualidade de seus pensamentos.",
  "O equilíbrio entre o trabalho e a vida é essencial para a felicidade.",
  "A mente é como um pára-quedas; funciona melhor quando está aberta.",
  "O que você faz hoje pode melhorar todos os seus amanhãs.",
  "A inspiração existe, mas ela precisa encontrar você trabalhando.",
  "Não espere. O tempo nunca será o certo.",
  "A vida é sobre criar-se, e não encontrar-se.",
  "Você não encontra a felicidade. Você a cria.",
  "O sucesso é uma jornada, não um destino.",
  "A inspiração é a luz que ilumina o caminho para o sucesso.",
  "Cada dia é uma nova oportunidade para mudar sua vida.",
  "O maior erro que você pode cometer é ter medo de cometer erros.",
  "A verdadeira inspiração vem de dentro."
];

const { width: larguraTela, height: alturaTela } = Dimensions.get('window');

const CitationsScreen = () => {
  const [citacao, setCitacao] = useState('');
  const [imagemFundo, setImagemFundo] = useState(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const hoje = new Date();
    const dia = hoje.getDate();
    setCitacao(citacoes[dia % citacoes.length]);

    // Seleciona uma imagem aleatória para o fundo
    const indiceAleatorio = Math.floor(Math.random() * imagens.length);
    setImagemFundo(imagens[indiceAleatorio]);
  }, []);

  // Configura o estilo animado para o efeito de paralaxe
  const estiloAnimado = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(translateX.value, [-1, 1], [-10, 10]) },
        { translateY: interpolate(translateY.value, [-1, 1], [-10, 10]) },
      ],
    };
  });

  const compartilharCitacao = async () => {
    try {
      await Share.share({
        message: citacao,
      });
    } catch (erro) {
      console.error('Erro ao compartilhar a citação:', erro);
    }
  };

  return (
    <View style={estilos.container}>
      {imagemFundo && (
        <PanGestureHandler
          onGestureEvent={(event) => {
            translateX.value = withSpring(event.nativeEvent.translationX / larguraTela);
            translateY.value = withSpring(event.nativeEvent.translationY / alturaTela);
          }}
          onEnded={() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
          }}
        >
          <Animated.View style={[estilos.imagemFundoContainer, estiloAnimado]}>
            <ImageBackground source={imagemFundo} style={estilos.imagemFundo}>
              <View style={estilos.conteudoCitacao}>
                <Text style={estilos.textoCitacao}>{citacao}</Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </PanGestureHandler>
      )}
      <TouchableOpacity style={estilos.botaoCompartilhar} onPress={compartilharCitacao}>
        <Text style={estilos.textoBotaoCompartilhar}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemFundoContainer: {
    width: larguraTela,
    height: alturaTela,
    position: 'absolute', 
  },
  imagemFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoCitacao: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  textoCitacao: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  botaoCompartilhar: {
    position: 'absolute', 
    bottom: 20, 
    backgroundColor: '#004D40',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  textoBotaoCompartilhar: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CitationsScreen;