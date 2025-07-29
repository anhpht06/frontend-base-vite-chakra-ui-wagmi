import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Box>
      <Text>App Layout</Text>
      <Outlet />
    </Box>
  );
}
