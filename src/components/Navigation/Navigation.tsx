import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PATHS } from './Navigation.constants';
import { DetailsScreen, HomeScreen } from '../../screens';

const Stack = createStackNavigator();

export const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={PATHS.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={PATHS.DETAILS_SCREEN} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
