import React, { useState, createContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';


export const ThemeContext = createContext();



const Theme = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const colorScheme = useColorScheme();

  // Load the theme preference from AsyncStorage on component mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        } else {
          // If no theme preference is found in AsyncStorage, set the theme based on the device's color scheme
          setIsDarkTheme(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme from AsyncStorage: ', error);
      }
    }

    loadTheme();
  }, []); // Add colorScheme as a dependency

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  // Save the selected theme to AsyncStorage when it changes
  useEffect(() => {
    async function saveTheme() {
      try {
        await AsyncStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      } catch (error) {
        console.error('Error saving theme to AsyncStorage: ', error);
      }
    }

    saveTheme();
  }, []);

  // Watch for changes in the device's color scheme and update the theme accordingly
  useEffect(() => {
    setIsDarkTheme(colorScheme === 'dark');
  }, []);

  const themeContextValue = {
    isDarkTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { Theme };
