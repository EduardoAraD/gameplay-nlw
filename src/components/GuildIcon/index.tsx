import React from 'react';
import { Image, View } from 'react-native';

import DiscordSVG from '../../assets/discord.svg';
import { styles } from './styles';

const { CDN_IMAGE } = process.env

type Props = {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  // const uri = 'https://gamerssuffice.com/wp-content/uploads/2019/11/How-to-add-bots-to-discord-500x405.jpg';

  return (
    <View style={styles.container}>
      {
        iconId ? (
          <Image
            style={styles.image}
            source={{ uri }}
            resizeMode='cover'
          />
        ) : (
          <DiscordSVG
            width={40}
            height={40}
          />
        )}
    </View>
  );
}