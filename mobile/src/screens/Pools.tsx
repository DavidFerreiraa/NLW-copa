import { FlatList, Icon, useToast, VStack } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardPros } from "../components/PoolCard";
import { Loading } from "../components/Loading";

import { Octicons } from "@expo/vector-icons";
import { api } from "../services/api";
import { useCallback, useState } from "react";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pools, setPools] = useState<PoolCardPros[]>([]);
    const { navigate } = useNavigation();
    const toast = useToast();

    async function fetchPools() {
        try {
            setIsLoading(true);
            const response = await api.get("/pools");
            setPools(response.data.pools);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            toast.show({
                title: "Ops! Ocorreu um erro ao carregar seus bolões.",
                placement: "top",
                bgColor: "red.500",
            });
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchPools();
        }, [])
    );

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Bolões" />
            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
                pb={4}
                mb={4}
            >
                <Button
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    leftIcon={
                        <Icon
                            as={Octicons}
                            name="search"
                            color="#000000"
                            size="md"
                        />
                    }
                    onPress={() => {
                        navigate("findpool");
                    }}
                />
            </VStack>
            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={pools}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PoolCard
                            data={item}
                            onPress={() => {
                                navigate("detailspool", { id: item.id });
                            }}
                        />
                    )}
                    ListEmptyComponent={() => <EmptyPoolList />}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        pb: 10,
                    }}
                />
            )}
        </VStack>
    );
}
