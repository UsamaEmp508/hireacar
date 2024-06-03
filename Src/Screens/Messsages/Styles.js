import { StyleSheet } from "react-native";
import { FONTSIZE } from "../../Theme/FontSize";
import { FONTFAMILY } from "../../Theme/FontFamily";
import { SPACING } from "../../Theme/Spacing";

export const styles = StyleSheet.create({


    container:{
      flex:1,
      paddingHorizontal:SPACING.space_20
    },
    screen_title:{
      fontSize:FONTSIZE.size_20,
      fontFamily:FONTFAMILY.Poppins_Bold,
      textAlign:"center",
      marginVertical:10
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
fontFamily:FONTFAMILY.Poppins_Regular,
paddingVertical:10

},

right:{
justifyContent:"center",
alignItems:"center",
padding:10,
borderRadius:10
},



messageContainer:{
  
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',

      marginTop:20,
      
    },
    image:{
      width:49,
    height:49,
    borderRadius:49
      },
      sender:{
        fontSize:FONTSIZE.size_14,
        fontFamily:FONTFAMILY.Poppins_Bold

      },
      message:{
        fontSize:FONTSIZE.size_12,
        fontFamily:FONTFAMILY.Poppins_Regular

      },
      timestamp:{
        fontSize:FONTSIZE.size_12,
        fontFamily:FONTFAMILY.Poppins_Regular
      },
      left_message:{
        flexDirection:"row",
        alignItems:"center",
        gap:15
      },
      message_count:{
        justifyContent:"center",
        alignItems:'center',
        width:17,
        height:17,
        borderRadius:17,
        backgroundColor:"#21408E"
      },
      count_Text:{
        fontSize:FONTSIZE.size_8,
        fontFamily:FONTFAMILY.Poppins_Regular,
        color:'#FFF'      }
   
})