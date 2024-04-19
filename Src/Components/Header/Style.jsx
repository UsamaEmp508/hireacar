import { StyleSheet, Platform } from "react-native";
import { SPACING } from "../../Theme/Spacing";
import { FONTSIZE } from "../../Theme/FontSize";
import { FONTFAMILY } from "../../Theme/FontFamily";

export const styles = StyleSheet.create({
  
  back_icon_image:{
    width:26,
    height:20
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    gap:SPACING.space_36,
    marginTop:SPACING.space_4,
  },
  heading:{
    fontFamily:FONTFAMILY.Jost_SemiBold,
    fontSize:FONTSIZE.size_20
  }

})