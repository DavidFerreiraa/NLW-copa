import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from 'native-base';

export default function App() {
  return (
      <NativeBaseProvider>
          <Center flex={1} bgColor="#000000">
              <Text color="#ffffff" fontSize={24}>Open up App.js to start working on your app!</Text>
              <StatusBar style="auto" />
          </Center>
      </NativeBaseProvider>
  );
}