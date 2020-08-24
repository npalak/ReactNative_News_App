import React from 'react';
import {View,StyleSheet,Text,ActivityIndicator,FlatList,Dimensions,Image,TouchableWithoutFeedback,Linking,Share,item} from 'react-native';
const{width,height}=Dimensions.get('window');
console.disableYellowBox=true;
export default class App extends React.Component{
state={
news:[],
loading:true,

}

fetchnews=()=>{
fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=20629dcfca8f418c8b96f86d043c2e21')
.then((res)=>res.json())
.then((response)=>{
this.setState({
news:response.articles,
loading:false
 })

})
}
componentDidMount(){
this.fetchnews()
}

sharearticle=async article=>{
try{
await Share.share({
message:'Checkout this article'+article
})
}catch(error){
console.log(error)
}

}
render(){
if(this.state.loading){
   return(
<View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#333'}}>
<ActivityIndicator size="large" color='#fff' />
</View>

    );
   }
else{
return(
<View style={styles.container}>
<View style={styles.header}>
<Text style={{fontSize:35,color:'#fff'}}>Top</Text>
<Text style={{fontSize:35,color:'#fff'}}>Headline</Text>
</View>
<View style={styles.news}>
<FlatList 
data={this.state.news}
renderItems={({items})=>{
return(
<TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
<View style={{width:width-50,height:200,backgroundColor:'#fff',marginBottom:15,borderRadius:15}}>
<Image  source={{uri:item.urlToImage}} style={[StyleSheet.absoluteFill,{borderRadius:15}]} />
<View style={styles.gradient}>
<Text style={{position:'absolute',bottom:0,color:'#fff',fontSize:20,padding:5}}>{item.title}</Text>

<Text style={{fontSize:16,color:'#fff',position:'absolute',top:0,right:0,padding:5,fontWeight:'bold'}} onPress={()=>this.sharearticle(item.url)}>Share</Text>
</View>

</View>
</TouchableWithoutFeedback>
);

}}
/>
</View>
</View>
   )
    }
  }
}

const styles=StyleSheet.create({
container:{
flex:1,
backgroundColor:'#333'
  },
header:{
   padding:30
   },
news:{
alignSelf:'center'
},

gradient:{
width:'100%',
height:'100%',
backgroundColor:'rgba(0,0,0,0.5)',
borderRadius:15
  }
})
















