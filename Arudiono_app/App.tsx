import React from 'react';
import { PaperProvider } from 'react-native-paper';
import CartScreen from './screens/CartScreen';

export default function App() {
  return (
    <PaperProvider>
      <CartScreen />
    </PaperProvider>
  );
}
