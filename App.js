import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './AppContainer';

const defaultTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F7E012',
    accent: '#424242',
  }
};

export default function Main() {
  return (
    <PaperProvider theme={defaultTheme}>
      <AppContainer />
    </PaperProvider>
  );
}
