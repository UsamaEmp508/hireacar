import React from "react";
import { Text, View } from "react-native";
import { ThemeProvider, createTheme } from '@rneui/themed';
import { FONTFAMILY } from "./Src/Theme/FontFamily";
import { FONTSIZE } from "./Src/Theme/FontSize";
import Route from "./Src/Navigation/Route";
export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: '#e7e7e8',
    },
    darkColors: {
      primary: '#000',
    },
    mode: 'light',
  });

  return (
      <ThemeProvider theme={theme}> 
   <Route/>
      </ThemeProvider>
  );
}