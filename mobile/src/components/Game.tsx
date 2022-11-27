import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
    id: string;
    firstTeamCountryCode: string;
    secondTeamCountryCode: string;
    firstTeamPointsFinalResult: number;
    secondTeamPointsFinalResult: number;
    guess: null | GuessProps;
    date: Date;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
  isLoading: boolean;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm, isLoading }: Props) {

  const { colors, sizes } = useTheme();
  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY [às] HH:00[hrs]")
  const isPassed = dayjs(data.date).isBefore(dayjs());

  return (
      <VStack
          w="full"
          bgColor="gray.800"
          rounded="sm"
          alignItems="center"
          borderBottomWidth={3}
          borderBottomColor={isPassed ? "gray.600" : "yellow.500"}
          mb={3}
          p={4}
      >
          <Text
              color={isPassed ? "gray.600" : "gray.100"}
              fontFamily="heading"
              fontSize="sm"
          >
              {getName(data.firstTeamCountryCode)} vs.{" "}
              {getName(data.secondTeamCountryCode)}
          </Text>

          <Text color={isPassed ? "gray.600" : "gray.200"} fontSize="xs">
              {when}
          </Text>

          <HStack
              mt={4}
              w="full"
              justifyContent="space-between"
              alignItems="center"
          >
              <Team
                  code={data.firstTeamCountryCode}
                  position="right"
                  onChangeText={setFirstTeamPoints}
              />

              {data.firstTeamPointsFinalResult != null ? (
                  <Text color="gray.300">
                      {data.firstTeamPointsFinalResult}
                  </Text>
              ) : null}
              <X color={colors.gray[300]} size={sizes[6]} />
              {data.secondTeamPointsFinalResult != null ? (
                  <Text color="gray.300">
                      {data.secondTeamPointsFinalResult}
                  </Text>
              ) : null}

              <Team
                  code={data.secondTeamCountryCode}
                  position="left"
                  onChangeText={setSecondTeamPoints}
              />
          </HStack>

          {!data.guess && (
              <Button
                  size="xs"
                  w="full"
                  bgColor="green.500"
                  mt={4}
                  onPress={onGuessConfirm}
                  isLoading={isLoading}
                  isDisabled={isPassed}
              >
                  <HStack alignItems="center">
                      <Text
                          color="white"
                          fontSize="xs"
                          fontFamily="heading"
                          mr={3}
                      >
                          CONFIRMAR PALPITE
                      </Text>

                      <Check color={colors.white} size={sizes[4]} />
                  </HStack>
              </Button>
          )}
      </VStack>
  );
}