import { Image, StyleSheet} from 'react-native'
import React from 'react'
import { Product } from '../../../domain/entities/product'
import { Card, Text } from '@ui-kitten/components'
import { FadeInImage } from '../ui/FadeInImage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParam } from '../../navigations/StackNavigator'

interface Props {
    product: Product    
}

const ProductCard = ({ product }: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParam>>();

  return (
    <Card
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ProductScreen', { productId: product.id})}
    >
      {
        product.images.length === 0
        ?(
          <Image 
            source={require('../../../assets/no-product-image.png')}
            style = {styles.image}
          />
        ):(
          <FadeInImage
            uri={product.images[0]}
            style = {styles.image}
          />
        )
      }
      <Text 
        numberOfLines={2}
        style = {styles.title}
      >{ product.title }</Text>


    </Card>

  )
}

export default ProductCard

const styles = StyleSheet.create({
  cardContainer:{
    flex: 1,
    backgroundColor: '#F9F9F9',
    margin: 3
  },
  image: {
    flex: 1,
    width: '100%',
    height: 200
  },
  title: {
    textAlign: 'center'
  }
})