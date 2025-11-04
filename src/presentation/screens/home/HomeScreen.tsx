import { StyleSheet} from 'react-native'
import React from 'react'
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-pages';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductList from '../../components/products/ProductList';
import FAB from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../navigations/StackNavigator';

const HomeScreen = () => {
  const { logout } = useAuthStore();

  const navigation = useNavigation<NavigationProp<RootStackParam>>();

  //* Uso de useInfinitiveQuery

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000*60*60, //una hora
    initialPageParam: 0, //COmo empiezan las llamadas
    
    queryFn: async(params) => {
      return await getProductsByPage(params.pageParam)
    },

    getNextPageParam:(lastPage, allPages) => allPages.length, //de cuantas iteraciones consta las llamadas

  });


  //* Uso normal de useQuery
  /*
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000*60*60, //1 hour
    queryFn: () => getProductsByPage(0)
  });
  */

  
  return (
    <>
      <MainLayout
        title='Teslo Shop Productos'
        subTitle='App Adm '

      >
        <Button
          accessoryLeft={<Icon name = 'log-out-outline' />}
          onPress={logout}
        >
          Cerrar sesion
        </Button>
        
        {
          isLoading? 
          <FullScreenLoader/>
          : (
            <ProductList products={data?.pages.flat()??[]} fetchNextPage = {fetchNextPage}/>
          )
        } 
      </MainLayout>
      <FAB
        iconName='plus'
        onPress = {() => navigation.navigate('ProductScreen', { productId: 'new'})}
        style={styles.fab}
      />
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20
  }

})