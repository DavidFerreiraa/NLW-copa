import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { NewPool } from "../screens/NewPool";
import { Pools } from "../screens/Pools";
import { FindPool } from "../screens/FindPool";
import { DetailsPool } from "../screens/DetailsPool";

import { PlusCircle, SoccerBall } from "phosphor-react-native";

import { useTheme } from "native-base";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const { colors, sizes } = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelPosition: "beside-icon",
                tabBarActiveTintColor: colors.yellow[500],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarStyle: {
                    position: "absolute",
                    height: sizes[22],
                    borderTopWidth: 0,
                    backgroundColor: colors.gray[800],
                    borderTopEndRadius: 12,
                    borderTopLeftRadius: 12,
                },
                tabBarItemStyle: {
                    position: "relative",
                    top: Platform.OS === "android" ? -10 : 0,
                },
            }}
        >
            <Screen
                name="newpool"
                component={NewPool}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PlusCircle color={color} size={sizes[6]} />
                    ),
                    tabBarLabel: "NOVO BOLÃO",
                }}
            />
            <Screen
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon: ({ color }) => (
                        <SoccerBall color={color} size={sizes[6]} />
                    ),
                    tabBarLabel: "MEUS BOLÕES",
                }}
            />
            <Screen
                name="findpool"
                component={FindPool}
                options={{ tabBarButton: () => null}}
            />
            <Screen
                name="detailspool"
                component={DetailsPool}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    );
}
