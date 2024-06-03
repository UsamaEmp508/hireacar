import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar
  } from "react-native";
  import React, { useContext } from "react";
  

import Header from "../../../Components/Header/Header";
import { ThemeContext } from "../../../Theme/ThemeContext";
import { darkTheme, lightTheme } from "../../../Theme/Color";
import { FONTFAMILY } from "../../../Theme/FontFamily";



  
  const Notifications = ({ navigation }) => {

    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

    const NotificationCard = ({ index, navigation }) => {
        return (
          <TouchableOpacity
            style={
              [styles.notifContainer,{backgroundColor:theme.BackgroundSecondary}]
             
            }
            key={index}
          >
            <View style={styles.detailContainer}>
              <Text
                style={
                  [styles.notifTitleText,{color:theme.primaryText}]
                  
                }
              >
                New Booking Request
              </Text>
              <Text style={[styles.notifDetailText,{color:theme.PrimarylightText}]}>
                Full cleaning of my new car. Interior Exterior both. Check date and
                time.
              </Text>
            </View>
            <Text
              style={[
                styles.notifDetailText,
                {
                  alignSelf: "flex-end",
                  color:  "#1F4590" ,
                },
              ]}
            >
              9:45PM
            </Text>
          </TouchableOpacity>
        );
      };

    const renderItem = ({ index }) => <NotificationCard index={index} navigation={navigation} />;
    const data = [
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "3",
      },
      {
        id: "4",
      },
      {
        id: "5",
      },
      {
        id: "6",
      },
      {
        id: "7",
      },
      {
        id: "8",
      },
      {
        id: "9",
      },
      {
        id: "10",
      },
    ];
  
    return (
      <SafeAreaView style={[styles.safeArea,{backgroundColor:theme?.primaryBackground}]}>

        <Header  text="Notifications" />
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={(item) => item.id}
          style={{ marginHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };
  
  export default Notifications;
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
     paddingHorizontal:10
    },
    notifContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0000001A",
        padding: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginVertical: 10,
      },
      detailContainer: {
        flex: 1,
      },
      notifTitleText: {
        fontFamily: FONTFAMILY.Poppins_SemiBold,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 30,
      },
      notifDetailText: {
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 20,
        fontFamily: FONTFAMILY.Poppins_Medium,

      },
  });
  