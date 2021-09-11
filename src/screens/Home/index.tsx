import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { Appointment } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';

type screenProp = StackNavigationProp<RootStackParamList, 'AppointmentCreate'>

export function Home() {
  const [category, setCategory] = useState('');
  const navigation = useNavigation<screenProp>();

  const appoinments = [
    {
      id: '1',
      guild: { id: '1', name: 'Lendários', icon: null, owner: true },
      category: '1',
      date: '22/06 às 20:40',
      description: 'É hoje que vamos chegar ao challenger sem perder um partida da md10'
    },
    {
      id: '2',
      guild: { id: '1', name: 'Lendários', icon: null, owner: true },
      category: '1',
      date: '22/06 às 20:40',
      description: 'É hoje que vamos chegar ao challenger sem perder um partida da md10'
    }
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

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
      <ListHeader title='Partidas Agendadas' subtitle='Total 6' />
      <FlatList
        data={appoinments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Appointment data={item} onPress={handleAppointmentDetails} />
        )}
        style={styles.matches}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        contentContainerStyle={{ paddingBottom: 69 }}
      />
    </Background>
  )
}