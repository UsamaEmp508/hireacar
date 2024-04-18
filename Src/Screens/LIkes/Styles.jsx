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
 
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
  },
  stepContainer: {
    flexDirection: 'row',
   
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingBottom: 8,
  },
  stepNumber: {
    fontSize: 16,
  
    fontFamily:FONTFAMILY.Poppins_Bold,
    marginRight: 8,
marginTop:5,

  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
marginTop:5,
    fontFamily:FONTFAMILY.Poppins_Bold,

  },
  stepDescription: {
    fontSize: 14,
    fontFamily:FONTFAMILY.Poppins_Medium,

    width: 230,
  },

  label:{
    fontSize: 18,
    marginVertical:5,
        fontFamily:FONTFAMILY.Poppins_Bold,
  },
  SLider_container:{
    marginVertical:10,
  },
  progressContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 6,
    marginVertical: 16,
  },
  progressBar: {
    borderRadius: 6,
    height: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 12,
    marginBottom: 6,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily:FONTFAMILY.Poppins_Medium,

    color: 'gray', // Default color for "Previous" button
  },
  note: {
    fontSize: 14,
    fontFamily:FONTFAMILY.Poppins_Medium,

    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  dropdown:{
    padding:10,
borderRadius:10
  }
});
