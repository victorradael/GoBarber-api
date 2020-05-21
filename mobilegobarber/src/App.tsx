import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#312e38" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: '#312e38' }} />
    </>
  );
};

export default App;
