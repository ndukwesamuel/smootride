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






const { width, height } = Dimensions.get("window");
const CancelModalTrip = ({closedTrip, cancelRequest, handleCloseModeTrip}) => {
  
  return (
    
      <Modal isVisible={closedTrip}>
        <View style={{backgroundColor:'#fff',width:'98%',height:220,padding:15,paddingTop:5,marginRight:0,alignSelf:'center' }}>
                    
                        <Text style={{color:'#000',fontSize:17,textAlign:'center',marginTop:20}}>Cancel Trip Request</Text> 
                        <Text style={{color:'#000',fontSize:15,textAlign:'center'}}>Do you really want to cancel the trip ?</Text>
                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {cancelRequest} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModeTrip} style={{width:'100%',backgroundColor:'#a31225',marginTop:10,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>No</Text>
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
export default CancelModalTrip;
