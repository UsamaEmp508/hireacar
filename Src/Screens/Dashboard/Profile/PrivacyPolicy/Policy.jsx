import { ScrollView, StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../../../Components/Header/Header'

import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { SPACING } from '../../../../Theme/Spacing';
import { FONTSIZE } from '../../../../Theme/FontSize';

const Policy = () => {

    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation()
  return (
   
<SafeAreaView style={{flex:1,backgroundColor:theme.primaryBackground}}>   
   
   <ScrollView style={[styles.container] }   contentContainerStyle={{paddingBottom:20}}>
        <Header text={'Privacy Policy'}/>
    <View style={{paddingHorizontal:20}}>

    
      <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>This privacy policy ("Policy") outlines how we collect, use, share, and protect the personal information of users ("you" or "user") of our website [hireacar.pk] ("Site") and our services. By using our Site and services, you consent to the practices described in this Policy. 1. Information We Collect We collect the following information from you:</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.1 Personal Information: We collect your name, email address, phone number, mailing address, date of birth, gender, and driver's license number.</Text>
    
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.2 Payment Information: We collect your credit card or other payment information when you make a reservation.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.3 Device Information: We collect information about the device you use to access the Site, such as your IP address, browser type, and operating system.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.4 Usage Information: We collect information about how you use the Site, such as the pages you visit, the links you click, and the search terms you use.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.5 Location Information: We collect information about your location when you use our services, such as your GPS coordinates.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>1.6 Social Media Information: We collect information from your social media accounts if you connect your social media accounts to our Site.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2. How We Use Your Information We use your information for the following purposes:</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.1 To provide you with the services you request: This includes making a reservation or renting a car.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.2 To communicate with you about your account or reservations.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.3 To improve our services and provide you with a better experience.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.4 To comply with our legal obligations.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.5 To protect our rights and interests.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.6 To market our services to you.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.7 To conduct research and development.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.8 To personalize your experience on our Site.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.9 To provide you with customer support.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.10 To prevent fraud and other illegal activities.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>2.11 To comply with the terms of service for our Site.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3. Sharing Your Information</Text>
      
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>We may share your information with the following third parties:</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3.1 Service providers: We may share your information with service providers who help us operate the Site, such as payment processors and hosting companies.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3.2 Advertisers and marketing partners: We may share your information with advertisers and marketing partners who help us promote our services.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3.3 Government agencies or other entities: We may share your information with government agencies or other entities that require us to share your information in order to comply with the law.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3.4 Other companies within our corporate group: We may share your information with other companies within our corporate group.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>3.5 Third parties you authorize: We may share your information with third parties that you authorize us to share your information with.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4. Your Rights You have the following rights with respect to your personal information:</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.1 The right to access your personal information.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.2 The right to correct any inaccuracies in your personal information.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.3 The right to delete your personal information.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.4 The right to object to the processing of your personal information.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.5 The right to restrict the processing of your personal information.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.6 The right to data portability.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>4.7 The right to withdraw your consent to the processing of your personal information. To exercise any of these rights, please contact us at [pp@hireacar.pk]</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>5. Security We take steps to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These steps include: 5.1 Using secure servers and encryption technology.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>5.2 Limiting access to your personal information to authorized employees.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>5.3 Training our employees on the importance of privacy and security. 5.4 Requiring third parties who have access to your personal information to comply with our privacy standards.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>6. Changes to This Privacy Policy We may update this Privacy Policy from time to time. If we make any material changes to this Privacy Policy, we will notify you by email or through a conspicuous notice on the Site.</Text>
      <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>7. Contact Us If you have any questions about this Privacy Policy, please contact us at [info@hireacar.pk] ---</Text>

      </View>

    </ScrollView>

    </SafeAreaView>
  )
}

export default Policy

const styles = StyleSheet.create({




    container: {
        flex: 1,
        paddingVertical:SPACING.space_10
      },
     
   
      title: {
        fontSize: FONTSIZE.size_16,
        fontFamily:FONTFAMILY.Poppins_SemiBold,
    
    },


    peragraph_text:{
        fontSize: FONTSIZE.size_14,
        fontFamily:FONTFAMILY.Poppins_Regular,
        marginTop:10
    }
})