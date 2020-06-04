import React from 'react'
import { View, Text, Button} from 'react-native';

function DetailsScreen({navigation}){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to details...again"
          onPress={()=> navigation.push('Details')}
        />
        <Button title="Go to home" onPress={()=> navigation.navigate('Home')} />
        <Button title="Go back" onPress = {()=> navigation.goBack()} />
        <Button
          title='Go back to first screen in stack'
          onPress={()=> navigation.popToTop()}
        />
      </View>
    )
}
  
export default DetailsScreen