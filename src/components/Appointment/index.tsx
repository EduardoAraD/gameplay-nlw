import React from 'react';
import { Text, View, Animated } from 'react-native';
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';

import { categories } from '../../utils/categories';
import { GuildIcon } from '../GuildIcon';
import { GuildProps } from '../Guild';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export type AppointmentProps = {
  id: string;
  guild: GuildProps,
  category: string;
  date: string;
  description: string;
  notificationId: string;
}

export type Props = RectButtonProps & {
  data: AppointmentProps,
  onPressRemove(): void;
}

export function Appointment({ data, onPressRemove, ...rest }: Props) {
  const [category] = categories.filter(item => item.id === data.category);
  const { owner, name } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              onPress={onPressRemove}
              style={styles.buttonRemove}
            >
              <Feather name='trash' size={32} color={theme.colors.heading} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton {...rest}>
        <View style={styles.container}>
          <LinearGradient
            style={styles.guildIconContainer}
            colors={[secondary50, secondary70]}
          >
            <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
          </LinearGradient>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.category}>{category.title}</Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.dateInfo}>
                <CalendarSvg />
                <Text style={styles.date}>{data.date}</Text>
              </View>

              <View style={styles.playersInfo}>
                <PlayerSvg fill={owner ? primary : on} />
                <Text style={[styles.player, { color: owner ? primary : on }]}>
                  {owner ? 'Anfitrião' : 'Visitante'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </RectButton>
    </Swipeable>
  )
}