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

    Header_Profile:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    paddingVertical:10
  


      },
      image_profile:{
        width:50,
        height:50,
        borderRadius:50,
        borderColor:'#21408E',
        borderWidth:4,
      },
      image:{
        width:35,
        height:35,
       
      },
      header_text:{

        
        fontFamily:'Inter_600SemiBold',
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        textAlign:'center',
    fontStyle:"normal",
    fontSize:18,
    lineHeight:22,
    fontWeight:"700",
    textAlign:"center",
    color:"#212325;"
      },
    

    header: {
     
    marginTop:SPACING.space_20,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
    },

    Header_heading:{
fontSize:FONTSIZE.size_24,
fontFamily:FONTFAMILY.Poppins_Bold
    },

    Header_Subheading:{
        fontSize:FONTSIZE.size_14,
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