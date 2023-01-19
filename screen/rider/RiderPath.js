import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Text,Dimensions,StatusBar,TouchableHighlight,Alert, ImageBackground,SafeAreaView,ActivityIndicator,StyleSheet,TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetTrips } from '../../Slice/auth/Getrider';
// import moment from "moment";

const RiderPaths = ({navigation, route}) => {

  const dispatch= useDispatch()
  const [loading, setLoading]= useState(false)
  const {tripPoints} = route.params;
  console.log("user id ", tripPoints)
  
  useEffect(()=>{

    const trial= async()=>{
      setLoading(true)
    await dispatch(GetTrips())
    setLoading(false)
    }
    trial()
  }, [])


  const trips = useSelector((state)=> state?.GetRiderSlice?.trips)
  const tripslength = trips?.length
  // console.warn("trips length tips ", tripslength)

  return (
    <ScrollView style={styles.container}>
                <View>
                    <View style={{backgroundColor:'#005091',padding:35}}>
                         <View style={{flexDirection:'row',padding:10,marginBottom:20}}>
                          <Ionicons onPress={() => navigation.navigate("TabNavigation", { screen: "RiderTrips" })} name="ios-arrow-back" size={26} color="#fff" style={{width:'6%'}}></Ionicons>
                          <Text style={{color:'#fff',width:'92%', fontSize:20,textAlign:'center',marginLeft:'-2%'}}>Way Points</Text>
                         </View>
                    </View>
                    {/* {
                        this.state.isFetching == true &&
                        <View style ={{marginTop:'45%'}}>
                            <Text style={{alignSelf:'center',fontFamily:'Roboto-Regular',fontSize:15}}>Getting address of PointRiderPaths 4 / 8 </Text>
                           <ActivityIndicator color="#007cc2" size='large' />
                        </View>
                    }
                    {
                        this.state.isFetching == false &&
                        <Timeline
                           innerCircle={'dot'}
                           lineColor='#005091'
                           circleColor='#007cc2'
                           timeContainerStyle={{minWidth:52, marginTop: 0}}
                           descriptionStyle={{color:'gray'}}
                           data={this.state.Address}
                           titleStyle = {{color:'gray',fontSize:14}}
                           timeStyle={{textAlign: 'center', backgroundColor:'#005091', color:'white', padding:2, borderRadius:13}}
                           options={{
                            style:{marginTop:15}
                          }}
                        />
                    } */}
                </View>
            </ScrollView>
);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:0,
        backgroundColor:'#fff'
    }
});


export default RiderPaths;