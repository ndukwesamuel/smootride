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
import { AntDesign } from '@expo/vector-icons'; 






const { width, height } = Dimensions.get("window");
const StaffOntrip = ({accepted, notificationData, handleOntrip}) => {
  
  return (
    
      <Modal isVisible={accepted}>
        {notificationData?.request?.content?.data?.type == "trip-start" && <View style={{backgroundColor:'#fff',width:'98%',height:'auto',padding:15,paddingTop:5,marginRight:0,alignSelf:'center' }}>
                    <Image
                                source={requestfile}
                                style={{width:40,height:40, alignSelf:'center',marginTop:20,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,textAlign:'center'}}>{notificationData?.request?.content?.title}</Text> 
                    
                        <Text style={{color:'#000',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}> {notificationData?.request?.content?.body}</Text>  
                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {handleOntrip} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Okay</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>}
                    {notificationData?.request?.content?.data?.type == "trip-reject" && <View style={{backgroundColor:'#fff',width:'98%',height:'auto',padding:15,paddingTop:5,marginRight:0,alignItems:'center', justifyContent:"center"}}>
                    <MaterialIcons name="cancel" size={38} color="red" />
                    
                        <Text style={{color:'#000',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}> {notificationData?.request?.content?.body}</Text>  
                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {handleOntrip} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Okay</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>}
                    {notificationData?.request?.content?.title == "Trip Update" && <View style={{backgroundColor:'#fff',width:'98%',height:'auto',padding:15,paddingTop:5,marginRight:0,alignItems:'center', justifyContent:"center"}}>
                    <Image
                                source={requestfile}
                                style={{width:40,height:40, alignSelf:'center',marginTop:20,marginBottom:15}}
                                />
                    
                    <Text style={{color:'#000',alignSelf:'center',fontSize:17,padding:12,marginRight:5, fontWeight:"bold"}}> {notificationData?.request?.content?.title}</Text>
                    <Text style={{color:'#000',alignSelf:'center',fontSize:13,marginRight:5}}> {notificationData?.request?.content?.body}</Text>
                    <Text style={{color:'#000',alignSelf:'center',fontSize:13,marginRight:5}}> Distance Covered: {notificationData?.request?.content?.data?.extraData?.Distant_Covered}</Text>
                    <Text style={{color:'#000',alignSelf:'center',fontSize:13,marginRight:5}}> Trip Amount: {notificationData?.request?.content?.data?.extraData?.tripAmt} naira</Text>  

                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {handleOntrip} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Okay</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>}
                    {notificationData?.request?.content?.title == "Trip-completed" && <View style={{backgroundColor:'#fff',width:'98%',height:'auto',padding:15,paddingTop:5,marginRight:0,alignItems:'center', justifyContent:"center"}}>
                    <AntDesign name="checkcircle" size={38} color="#005091" />
                    
                    <Text style={{color:'#000',alignSelf:'center',fontSize:17,padding:12,marginRight:5, fontWeight:"bold"}}> {notificationData?.request?.content?.title}</Text>
                    <Text style={{color:'#000',alignSelf:'center',fontSize:13,marginRight:5}}> {notificationData?.request?.content?.body}</Text> 
                    <Text style={{color:'#000',alignSelf:'center',fontSize:13,marginRight:5}}> Price of Trip: {notificationData?.request?.content?.data?.data?.tripAmt} naira</Text> 


                        <View style={{padding:10,alignSelf:'center',marginTop:5,width:'100%'}}>
                            <TouchableOpacity onPress = {handleOntrip} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5}}>Okay</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>}
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
export default StaffOntrip;
