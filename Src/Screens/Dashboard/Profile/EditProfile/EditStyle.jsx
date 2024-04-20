import { StyleSheet, Text, View } from 'react-native'
import { FONTFAMILY } from '../../../../Theme/FontFamily'
export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,


    },
  
    form_container:{
        marginTop:20,
    },
    input_container:{
marginBottom:12
    },
    label:{
        fontFamily:FONTFAMILY.Poppins_Medium,
        fontSize:14,
        fontWeight:'500',
        marginBottom:5,
        opacity:0.7
    },
    input:{
width:'100%',
borderRadius:10,
paddingHorizontal:20,
paddingVertical:10,
fontFamily:FONTFAMILY.Poppins_Regular,


    },
    input_about:{
        width:'100%',
        height:119,
        borderRadius:10,
        borderWidth:1,
borderColor:"#006175"
            },
            name_contaier:{
                flexDirection:"row",
                justifyContent:'space-between',
                alignItems:'center',
                marginTop:20,
                gap:10
            },
            image:{
                width:67,
                height:67,
                borderRadius:67
            },
            User_name:{
               
                fontFamily:FONTFAMILY.Poppins_SemiBold,
                fontSize:18,
            },
            user_lastname:{
                fontFamily:FONTFAMILY.Poppins_SemiBold,

                fontSize:12,
                marginTop:-4,
            },
   

})