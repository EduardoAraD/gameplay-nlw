import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon } from '../../components/ButtonIcon';
import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';
import { Background } from '../../components/Background';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

export function SignIn() {
  const navigation = useNavigation<homeScreenProp>();

  function handleSignIn() {
    navigation.navigate('Home')
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode='stretch'
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`}
            e organize {`\n`}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          <ButtonIcon
            title="Entrar no Discord"
            onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  )
}