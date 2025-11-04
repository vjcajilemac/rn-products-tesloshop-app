import { FlatList, Image, StyleSheet} from 'react-native'
import React from 'react'
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
    images: string[];
}


const ProductImages = ( { images }: Props) => {
  return (
    <>
        {
          (images.length === 0)
          ? <Image 
              source = { require('../../../assets/no-product-image.png')} 
              style = {styles.defaultImage}
            />
          :(
            <FlatList
              data={images}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <FadeInImage uri={item} style={styles.image} />
              )}
            />
          )
        }
    </>
  )
}

export default ProductImages

const styles = StyleSheet.create({

    image: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
    defaultImage: {
    width: 300,
    height: 100
  }
})