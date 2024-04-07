import { StyleSheet } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container:{
        flex:1,
    paddingHorizontal:SPACING.space_20
      
    },
    header: {
     
    marginTop:SPACING.space_20,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
    },

    Header_heading:{
fontSize:FONTSIZE.size_28,
fontFamily:FONTFAMILY.Poppins_Bold
    },

    Header_Subheading:{
        fontSize:FONTSIZE.size_16,
        fontFamily:FONTFAMILY.Poppins_Medium
            },


    header_right:{
        flexDirection:"row",
        alignItems:"center",
    gap:15
    },

    search:{
        marginTop:SPACING.space_10,
        flexDirection:"row",
        gap:15,
        alignItems:"center",
    },
  
    left:{
        flexDirection:"row",
    flex:1,
       gap:15,

       paddingHorizontal:SPACING.space_16,
        alignItems:"center",
        paddingVertical:SPACING.space_4,
        borderRadius:SPACING.space_15
    },

left_input:{
flex:1,
fontSize:FONTSIZE.size_14,
fontFamily:FONTFAMILY.Poppins_Regular

},

right:{
justifyContent:"center",
alignItems:"center",
padding:10,
borderRadius:10
},






    title: {
      fontSize: FONTSIZE.size_24,
   
      fontFamily:FONTFAMILY.Poppins_Bold,
      marginBottom: SPACING.space_10,


    },
row:{
    marginTop:SPACING.space_10,

    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
},


row_heading_left:{
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Poppins_Bold
},
row_heading_right:{
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_Medium
},


    
   
  });