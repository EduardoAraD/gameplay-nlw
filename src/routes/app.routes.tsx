import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { theme } from '../global/styles/theme';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { AppointmentProps } from '../components/Appointment';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  AppointmentDetails: { guildSelected: AppointmentProps };
  AppointmentCreate: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        },
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen name='AppointmentDetails' component={AppointmentDetails} />
      <Screen name='AppointmentCreate' component={AppointmentCreate} />
    </Navigator>
  );
}
