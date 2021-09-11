import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { ButtonIcon } from '../../components/ButtonIcon';
import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';
import { MessageSnackBar } from '../../components/MessageSnackBar';

export function SignIn() {
  const { signIn, loading } = useAuth();
  const [isVisibleSnackbar, setisVisibleSnackbar] = useState(false);

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      setisVisibleSnackbar(true);
    }
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
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon
              title="Entrar no Discord"
              onPress={handleSignIn}
            />
          )}
        </View>
      </View>
      <MessageSnackBar
        title='Não foi possível autenticar'
        success={false}
        visible={isVisibleSnackbar}
        onClose={() => setisVisibleSnackbar(false)}
      />
    </Background>
  )
}