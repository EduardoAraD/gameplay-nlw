import React from 'react'
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';
import DiscordSVG from '../../assets/discord.svg';
import { styles } from './styles';

type Props = {
  urlImage: string;
}

export function Avatar({ urlImage }: Props) {
  const { secondary50, secondary70 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
    >
      {urlImage ? (
        <Image
          source={{ uri: urlImage }}
          style={styles.image}
        />
      ) : (
        <DiscordSVG
          width={32}
          height={32}
        />
      )}
    </LinearGradient>
  );
}