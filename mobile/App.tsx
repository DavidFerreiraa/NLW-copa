import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";

import { THEME } from "./src/styles/THEME";

import { Loading } from "./src/components/Loading";
import { FindPool } from "./src/screens/FindPool";
import { AuthContextProvider } from "./src/context/AuthContext";

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    });

    return (
        <NativeBaseProvider theme={THEME}>
            <AuthContextProvider>
                {fontsLoaded ? <FindPool /> : <Loading />}
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
