import { StyleSheet, Platform } from "react-native";
import { FONTSIZE } from "../../Theme/FontSize";
import { FONTFAMILY } from "../../Theme/FontFamily";
import { SPACING } from "../../Theme/Spacing";
import { BORDERRADIUS } from "../../Theme/BorderRadius";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo_image: {
    width: 70,
    height: 70,
  },
  logo_Text: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.Jost_SemiBold,
    marginLeft: 3,
  },
  logo_subText: {
    fontSize: FONTSIZE.size_11,
    fontFamily: FONTFAMILY.Poppins_SemiBold,
    textTransform: 'uppercase',
    marginTop: -8,
  },
  started_heading: {
    fontFamily: FONTFAMILY.Jost_SemiBold,
    fontSize: FONTSIZE.size_24,
    marginTop: SPACING.space_20,
  },
  started_SubHeading: {
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
    marginTop: SPACING.space_8,
  },
  form_container: {
    marginTop: SPACING.space_16,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  
  borderRadius: BORDERRADIUS.radius_12,
    paddingHorizontal: SPACING.space_18,
    paddingVertical: SPACING.space_2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 0.5,
      },
    }),
  },
  input_image: {
    width: 19,
    height: 15,
  },
  Password_input_image: {
    width: 15,
    height: 20,
  },
  eye_Password_input_image:{
width:20,
height:20,
  },
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
  },
  errorText:{
    color:'red',
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
    marginTop:SPACING.space_4
  },
  Button:{
    marginTop:SPACING.space_20,
    width:'100%',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
    borderRadius:BORDERRADIUS.radius_33,
    backgroundColor:'#0961F5',
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
    fontFamily: FONTFAMILY.Jost_SemiBold,
    fontSize: FONTSIZE.size_18,
    color:'#FFF',
    textAlign:'center',
    flex:1,
  },
  policy_check:{
    flexDirection:'row',
justifyContent:'space-between',
    alignItems:"center",
    marginTop:SPACING.space_15
  },
  Policy_text:{
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
  },
  sign_link:{
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
gap:3,
marginTop:SPACING.space_10

  },
  already_account:{
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
  },
  Sign_in:{
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
    color:'#0961F5',
   
    textDecorationStyle: 'solid', // This is required for borderBottomWidth to work
    borderBottomWidth: 2, 
    borderColor:'#0961F5'

  },
  SLider_container:{
    marginVertical:30
  }
});
