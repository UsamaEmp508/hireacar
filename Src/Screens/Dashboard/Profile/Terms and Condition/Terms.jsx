import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../../../Components/Header/Header'

import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { SPACING } from '../../../../Theme/Spacing';
import { FONTSIZE } from '../../../../Theme/FontSize';
import { ScrollView } from 'react-native-gesture-handler';
const Terms = () => {

    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.primaryBackground}] }   contentContainerStyle={{paddingBottom:20}}>
    <Header text={'Terms and Conditions'}/>
  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>Terms and Conditions</Text>



  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>1. Introduction</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>By accessing or using our car rental marketplace, you agree to comply with and be bound by the following terms and conditions (the "Terms"). If you do not agree to these Terms, you must not access or use our services.</Text>

  

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>2. Definitions</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>"Platform" refers to our car rental marketplace where owners and renters can connect. "Owner" refers to the individual listing a car for rent. "Renter" refers to the individual renting a car from an Owner. "Services" refers to any services provided through our Platform.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>3. User Responsibilities
3.1 Owners</Text>


<Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>
3.1 Owners</Text>
  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>Verification: Owners must verify the identity of Renters by conducting thorough background checks, including driving history and criminal background checks. The Platform is not responsible for any verification process or failures thereof. Liability for Damages: Owners are solely responsible for any damages to their vehicle and agree to not hold the Platform liable for any such damages.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>3.2 Renters</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>Verification: Renters must provide true and accurate information for verification by Owners. Liability for Damages: Renters are responsible for any damages to the rented vehicle and agree to compensate the Owner according to the agreement made between the parties.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>4. No Liability</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>The Platform is not liable for any damages, disputes, or other issues that may arise between Owners and Renters. The Platform acts solely as a facilitator and does not participate in any transactions or agreements between parties.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>5. Dispute Resolution</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>Any disputes between Owners and Renters must be resolved directly between the parties. The Platform may, at its discretion, assist in mediation but is not obligated to do so.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>6. Termination</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>We may terminate or suspend your access to the Platform at any time, without prior notice or liability, for conduct that we believe violates these Terms or is harmful to other users of the Platform, us, or third parties, or for any other reason.</Text>

  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>7. Governing Law</Text>

  <Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles.</Text>


  <Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>8. Amendments</Text>

<Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>We reserve the right to amend these Terms at any time. The amended Terms will be effective immediately upon posting on the Platform.</Text>
<Text style={[styles.title,{color:theme.primaryText,marginTop:20}]}>9. Contact Information</Text>

<Text style={[styles.peragraph_text,{color:theme.PrimarylightText}]}>For any questions regarding these Terms, please contact us at info@hireacar.pk.</Text>



  

</ScrollView>
  )
}

export default Terms

const styles = StyleSheet.create({


    container: {
        flex: 1,
        paddingHorizontal: SPACING.space_24,
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