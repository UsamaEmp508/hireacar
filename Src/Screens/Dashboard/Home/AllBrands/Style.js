import { StyleSheet } from "react-native";
import { SPACING } from "../../../../Theme/Spacing";
import { FONTSIZE } from "../../../../Theme/FontSize";
import { FONTFAMILY } from "../../../../Theme/FontFamily";

export const styles = StyleSheet.create({
    
    container:{
        flex:1,
        paddingHorizontal:SPACING.space_20
      },
      screen_title:{
        fontSize:FONTSIZE.size_18,
        fontFamily:FONTFAMILY.Poppins_SemiBold
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
  heading: {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
})