import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://gamerssuffice.com/wp-content/uploads/2019/11/How-to-add-bots-to-discord-500x405.jpg';

  return (
    <Image
      style={styles.image}
      source={{ uri }}
      resizeMode='cover'
    />
  )
}