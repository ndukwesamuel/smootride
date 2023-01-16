import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import CardView from "react-native-cardview";

const RideRequest = () => {
  return (
    <View>
      {/* {
        Object.keys(this.props.drivertrip.position).length > 0 && this.props.drivertrip.isStarted == true &&
        <MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
         style={{height:mapviewheight}}
         showUserLocation
         followUserLocation
         loadingEnabled
         region={this.getMapRegion()}
         >
         <Polyline coordinates={this.props.drivertrip.routeCoordinates} strokeWidth={2} />
         <Marker.Animated
             ref={marker => {
             this.marker = marker;
             }}
             coordinate={this.state.coordinate}
         />    
         </MapView>
    } */}

      {
        // this.props.rider.rider_name == '' && this.props.data.isFetching == false &&
        <View style={{ padding: 10 }}>
          {/* <CardView
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={5}
            style={styles.cardview}
          > */}
          <Text style={{ color: "#877A80", alignSelf: "center", fontSize: 16 }}>
            No Ride Request Assigned Yet
          </Text>
          {/* </CardView> */}
        </View>
      }

      {/* {
        this.props.drivertrip.isStarted == false && this.props.rider.rider_id !== '' && this.props.rider.accept == false &&
        <View style = {styles.viewcard}>
             <View>
             <View style={{padding:10}}>
                         <Text style={{alignSelf:'center',marginTop:10,fontSize:15,color:'#007cc2'}}>Hi, {this.props.data.user_name}</Text>
                         <Text style={{alignSelf:'center',marginTop:10,fontSize:15,color:'#877A80'}}>You have a new Trip Request.</Text>
             </View>     
             <CardView
                     cardElevation={0.6}
                     cardMaxElevation={0.6}
                     cornerRadius={10}
                     style = {{marginTop:7}}>
                        
                     <View style={{flexDirection:'row'}}>
                     <View style= {{width:'22%',marginStart:10}}>
                     
                         {
                             this.props.rider.rider_image != null && 
                             <Image
                             source={{uri: `https://smoothride.ng/taxi/images/${this.props.rider.rider_image}`}}
                             style={{width:50,height:50,borderRadius:25, alignSelf:'center',margin:5}}
                             />
                         } 
                         {
                             this.props.rider.rider_image == null && 
                             <Image
                             source={require('../../asset/img/profile.jpg')}
                             style={{width:50,height:50,borderRadius:25, alignSelf:'center',margin:5}}
                             />
                         }
                     
                     </View>
                     <View style = {{width:'60%',marginLeft:5}}>
                         <Text style={{fontSize:17,marginTop:1,color:'#877A80',fontWeight:'bold'}}> {this.props.rider.rider_name}</Text>
                         {
                             this.props.rider.company_name == null &&
                             <Text style={{fontSize:16,fontWeight:'200',color:'#877A80',fontFamily: "Roboto-Regular"}}> Unknown </Text>
                         }
                         {
                             this.props.rider.company_name != null &&
                             <Text style={{fontSize:16,fontWeight:'800',color:'#007cc2',fontFamily: "Roboto-Regular"}}> {this.props.rider.company_name}</Text>
                         }
                                                                                             
                     </View>
                     <View>
                         <View style={{borderColor:'#007cc2',borderWidth:2,borderRadius:17,width:35,height:35,marginTop:10}}>
                             <Ionicons onPress={this.call} name='md-call' size={20} style={{color:'#007cc2',alignSelf:'center',marginTop:5}}/>
                         </View>
                         
                     </View>
                                 
                     </View>
                 </CardView>
                   
             </View>   
             <View>
                <View style={{flexDirection:'row'}}>
                    <View style ={{width:'30%',justifyContent:'center'}}>
                             {
                                 this.state.isrequesting == false &&
                                 <TouchableOpacity onPress={this.rejectTrip}  style={{marginTop:7, backgroundColor:'#a31225',padding:7,width:'100%',alignSelf:'center'}}>
                                     <Text style={{alignSelf:'center',color:'#fff',fontSize:13,fontFamily:'Roboto-Regular'}}>Reject</Text> 
                                 </TouchableOpacity>
                             }
                            
                            {
                                this.state.isrequesting == true &&
                                <TouchableOpacity style={{marginTop:7, backgroundColor:'#a31225',padding:7,width:'100%',alignSelf:'center'}}>
                                   <ActivityIndicator color="#fff" size='small' />
                                </TouchableOpacity> 
                            }
                     </View>
                     <View style ={{width:'40%',justifyContent:'center'}}></View>
                    <View style ={{width:'30%'}}>
                       
                            <TouchableOpacity onPress={this.acceptTrip}  style={{marginTop:7, backgroundColor:'#005091',padding:7,width:'100%',alignSelf:'center'}}>
                             <Text style={{alignSelf:'center',color:'#fff',fontSize:13,fontFamily:'Roboto-Regular'}}>Accept</Text> 
                            </TouchableOpacity>

                    </View>
                </View>
             </View>   
             
         </View>
       
     } */}
    </View>
  );
};

export default RideRequest;

const styles = StyleSheet.create({});
