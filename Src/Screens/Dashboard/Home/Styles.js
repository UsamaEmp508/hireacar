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
fontSize:22,
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
       gap:10,

       paddingHorizontal:SPACING.space_16,
        alignItems:"center",
        paddingVertical:SPACING.space_16,
        borderRadius:SPACING.space_15,
        paddingHorizontal:SPACING.space_10
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

suggestionsContainer: {
    position: "absolute",
    zIndex:1000,
    top: 230,
    right: 10,
   
    backgroundColor: "#FFFFFF",
    color:"#000000",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestion: {
    paddingVertical: 5,
    color:"#000"
  },
    
   
  });