import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

import { RootStackParamList } from '../../routes/app.routes';

import { COLLECTION_APPOINTMENTS } from '../../config/database';

import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { GuildProps } from '../../components/Guild';
import { MessageSnackBar } from '../../components/MessageSnackBar';
import { Guilds } from '../Guilds';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type screenProp = StackNavigationProp<RootStackParamList, 'Home'>

export function AppointmentCreate() {
  const navigation = useNavigation<screenProp>();

  const [openGuildsModal, setOpenGuildsModal] = useState(false);

  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [category, setCategory] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const [textMessage, setTextMessage] = useState('');
  const [successSnackbar, setSuccessSnackBar] = useState(false);
  const [isVisibleSnackbar, setisVisibleSnackbar] = useState(false);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleSnackbar(text: string, success: boolean) {
    setTextMessage(text);
    setSuccessSnackBar(success);
    setisVisibleSnackbar(true);
  }

  async function handleSave() {
    console.log(category);
    if (category !== '') {
      handleSnackbar('É necessário cadastrar a categoria.', false)
      return;
    }
    if (guild) {
      handleSnackbar('É necessário cadastrar o Servidor', false)
      return;
    }
    if (day && month) {
      handleSnackbar('É necessário cadastrar o dia e o mês.', false)
      return;
    }
    if (hour && minute) {
      handleSnackbar('É necessário cadastrar a hora e o minuto.', false)
      return;
    }
    if (description) {
      handleSnackbar('É necessário cadastrar a descrição.', false)
      return;
    }

    const now = new Date(Date.now())
    const dateString = `${now.getFullYear()}/${month}/${day} ${hour}:${minute}:00`;

    const dateCreate = new Date(dateString);
    const timeNow = now.getTime();
    const timeCreate = dateCreate.getTime();

    if (!!timeCreate) {
      handleSnackbar('Os valores da data e horario estão inválidos.', false)
      return;
    }
    if (timeCreate - timeNow) {
      handleSnackbar('A data cadastrada é menor que a data atual.', false)
      return;
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - dateCreate.getTime()) / 1000)
    )

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Vamos pra ação ${guild.name}`,
        body: description,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds,
        repeats: false
      }
    })

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
      notificationId,
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    handleSnackbar('Cadastrado com sucesso.', true);

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <Header title='Agendar Partida' />
        <ScrollView>
          <Text style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }
          ]}>Categoria</Text>
          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                  : <View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um Servidor'}
                  </Text>
                </View>
                <Feather
                  name='chevron-right'
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                  />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.carecteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button title='Agendar' onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>
      {openGuildsModal &&
        <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds} >
          <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
      }
      <MessageSnackBar
        title={textMessage}
        success={successSnackbar}
        visible={isVisibleSnackbar}
        onClose={() => setisVisibleSnackbar(false)}
      />
    </KeyboardAvoidingView>
  )
}