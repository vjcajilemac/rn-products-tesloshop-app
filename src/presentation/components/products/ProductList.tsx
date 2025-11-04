import { RefreshControl, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Layout, List } from '@ui-kitten/components'
import { Product } from '../../../domain/entities/product';
import ProductCard from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[];
    //* fetch nect page 
    fetchNextPage: () => void;
}

const ProductList = ({ products, fetchNextPage }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const queryClient = useQueryClient();

    const onPullToRefresh = async () => {
        setIsRefreshing(true);
        //Sleep 2
        await new Promise<void>(resolve => setTimeout(resolve, 1500));
        queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
        setIsRefreshing(false);
    }

  return (
    <List
        data={ products }
        numColumns={ 2 }
        keyExtractor={ (item, index) => `${item.id}-${index}`}
        renderItem={({item}) => (
            <ProductCard key = {item.id} product={item}/>
        )}

        ListFooterComponent={() => <Layout style={styles.layoutFooter}/>}
        onEndReached={ fetchNextPage}
        onEndReachedThreshold={ 0.8 }

        refreshControl={
            <RefreshControl 
                refreshing = { isRefreshing }
                onRefresh={ onPullToRefresh }   
            />
        }
    />
  )
}

export default ProductList

const styles = StyleSheet.create({
    layoutFooter: {
        height: 150
    }
})