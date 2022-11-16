import { StatusBar } from "expo-status-bar";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, Text, Center } from "native-base";

import { THEME } from "./src/styles/THEME";

export default function App() {

    const [ fontsLoaded ] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});

    return (
        <NativeBaseProvider theme={THEME}>
            <Center flex={1} bgColor="gray.900">
                <Text color="#ffffff" fontSize={24}>
                    Hello React Native
                </Text>
                <StatusBar style="auto" />
            </Center>
        </NativeBaseProvider>
    );
}
