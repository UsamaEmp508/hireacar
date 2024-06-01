import { StyleSheet } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container:{
      
        flex:1,
    },
    slide: {
     
    marginTop:SPACING.space_20,
    paddingHorizontal:SPACING.space_32

    },
  
    title: {
      fontSize: FONTSIZE.size_24,
   
      fontFamily:FONTFAMILY.Poppins_Bold,
      marginBottom: SPACING.space_10,


    },
    text: {
      fontSize: FONTSIZE.size_10,
      fontFamily:FONTFAMILY.Poppins_Regular,
textAlign:"left"
     
    
    },
   
    buttonText: {
      fontSize: 18,
      color: 'blue',
      fontWeight: 'bold',
    },
    dotstyle:{
        width:12,
        height:4,
        borderRadius:10,
        backgroundColor:'#999999',
marginBottom:hp('40%')
    },
    activeDotStyle:{
      width:24,
      height:4,
      borderRadius:10,
      backgroundColor:'#FFFFFF',
      marginBottom:hp('40%')


    },
    nextButton:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:"#4477C3",
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp('20%')

    },
    nextButtonText:{
        fontSize:FONTSIZE.size_16,
        fontFamily:FONTFAMILY.Jost_SemiBold,  
        color:'white'
    },
    Button:{
      marginTop:SPACING.space_32,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_10,
    
      position:"absolute",
      bottom:hp('10%'),
      alignSelf:'center',
      
      borderRadius:BORDERRADIUS.radius_10,
      backgroundColor:'#4477C3',
      shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 2
    },
    Button_inner_left:{
      width:48,
      height:48,
      borderRadius:50,
      backgroundColor:"#FFF",
      justifyContent:'center',
      alignItems:'center',
     
    },
    button_icon:{
      width:21,
      height:17
    },
    button_text:{
      fontFamily: FONTFAMILY.Poppins_Regular,
      fontSize: FONTSIZE.size_14,
      color:'#FFF',
      textAlign:'center',
      flex:1,
    }
    
  });