import { useEffect, useState } from "react";

import { ActionIcon, Box, Group, Text } from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconReload,
} from "@tabler/icons-react";

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isStarted]);

  const start = () => {
    setIsStarted(true);
  };
  const stop = () => {
    setIsStarted(false);
  };
  const reset = () => {
    setTime(0);
    setIsStarted(false);
  };

  const convertedValue = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Group align="center" h="100%" pl={16} pr={16}>
      <Box>
        <Text size="xl">{convertedValue(time)}</Text>
      </Box>
      {isStarted ? (
        <ActionIcon onClick={stop} variant="transparent">
          <IconPlayerPause />
        </ActionIcon>
      ) : (
        <ActionIcon onClick={start} variant="transparent">
          <IconPlayerPlay />
        </ActionIcon>
      )}
      <ActionIcon onClick={reset} variant="transparent">
        <IconReload />
      </ActionIcon>
    </Group>
  );
};
