import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../routes/app.routes';

import { COLLECTION_APPOINTMENTS } from '../../config/database';

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Loading } from '../../components/Loading';

import { styles } from './styles';

type screenProp = StackNavigationProp<RootStackParamList, 'AppointmentCreate'>

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<screenProp>();

  const [appointments, setAppointments] = useState<AppointmentProps[]>([])

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage);
    }
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]))

  return (
    <Background >
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {loading ? <Loading /> : (
        <>
          <ListHeader title='Partidas Agendadas' subtitle={`Total ${appointments.length}`} />
          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
    </Background>
  )
}