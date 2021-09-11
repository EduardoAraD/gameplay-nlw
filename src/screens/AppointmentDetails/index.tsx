import React, { useEffect, useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import {
  FlatList,
  ImageBackground,
  Text,
  View,
  Share,
  Platform
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Loading } from '../../components/Loading';
import { MessageSnackBar } from '../../components/MessageSnackBar';

import { theme } from '../../global/styles/theme';
import banner from '../../assets/banner.png';
import { styles } from './styles';
import { api } from '../../services/api';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const [isVisibleSnackbar, setisVisibleSnackbar] = useState(false);

  async function fecthGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      setisVisibleSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Juste-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fecthGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title='Detalhes'
        action={
          guildSelected.guild.owner && !!widget.instant_invite &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto name='share' size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={banner} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? <Loading /> : (
        <>
          <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`} />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}
      {guildSelected.guild.owner && !!widget.instant_invite && (
        <View style={styles.footer}>
          <ButtonIcon
            title='Entrar na partida'
            onPress={handleOpenGuild}
          />
        </View>
      )}
      <MessageSnackBar
        title='Verifique as configurações do servidor. Será que o Widget está habilidado?'
        success={false}
        visible={isVisibleSnackbar}
        onClose={() => setisVisibleSnackbar(false)}
      />
    </Background>
  )
}