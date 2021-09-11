import React from 'react';
import {
  Modal,
  ModalProps,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

type Props = ModalProps & {
  isVisible: boolean;
  closeModal(): void;
}

export function ModalSignOut({ isVisible, closeModal, ...rest }: Props) {
  const { signOut } = useAuth();
  const { secondary50, secondary70, primary } = theme.colors

  function handleSignOut() {
    signOut();
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='slide'
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <LinearGradient
            style={styles.container}
            colors={[secondary50, secondary70]}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Deseja sair do Game</Text>
              <Text style={[styles.title, { color: primary }]}>Play</Text>
              <Text style={styles.title}>?</Text>
            </View>
            <View style={styles.contentButton}>
              <TouchableOpacity
                onPress={closeModal}
                activeOpacity={0.8}
                style={styles.notButton}>
                <Text style={styles.textButton}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSignOut}
                activeOpacity={0.8}
                style={styles.yesButton}>
                <Text style={styles.textButton}>Sim</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}