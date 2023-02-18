import React, { useEffect, useState } from "react";
import clientimg from "../../assets/images/profile.jpg";
import {
  View,
  Text,
  Dimensions,
  Button,
  TouchableHighlight,
  Alert,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import requestfile from "../../assets/images/requestfile.png";
import { MaterialIcons } from '@expo/vector-icons';






const { width, height } = Dimensions.get("window");
const RejectRequest = ({accepted, handleAccept}) => {
  
  return (
    
      <Modal isVisible={accepted}>
        <View style={{backgroundColor:'#fff',width:'98%',height:'auto',padding:15,paddingTop:5,marginRight:0,alignItems:'center', justifyContent:"center" }}>
        <MaterialIcons name="cancel" size={38} color="red" />
                        <Text style={{color:'#000',fontSize:15,textAlign:'center'}}>Trip Rejected</Text> 
                    
                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {handleAccept} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Okay</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
      </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default RejectRequest;
