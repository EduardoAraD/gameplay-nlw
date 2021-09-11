import React, { useEffect } from 'react';
import SnackBar from 'react-native-snackbar-component';
import { theme } from '../../global/styles/theme';

type Props = {
  title: string;
  success: boolean;
  visible: boolean;
  onClose(): void;
}

export function MessageSnackBar({
  success,
  title,
  visible,
  onClose
}: Props) {
  const { on, primary, heading } = theme.colors

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onClose();
      }, 3000)
    }
  }, [visible])

  return (
    <SnackBar
      visible={visible}
      textMessage={title}
      backgroundColor={success ? on : primary}
      messageColor={heading}
      messageStyle={{
        fontFamily: theme.fonts.title700,
      }}
    />
  );
}