import { StyleSheet } from "react-native"
import { FONTSIZE } from "../../../Theme/FontSize"
import { FONTFAMILY } from "../../../Theme/FontFamily"
import { SPACING } from "../../../Theme/Spacing"

export const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:'center',
padding:20
},
    logim_google:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        gap:10,
        width:"100%",
        padding:10
   
    },
    title: {
        fontSize: FONTSIZE.size_14,
     
        fontFamily:FONTFAMILY.Poppins_SemiBold,
  
  
      },
})
