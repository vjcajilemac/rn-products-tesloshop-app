import { ScrollView, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById, updateCreateProduct } from '../../../actions/products';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParam } from '../../navigations/StackNavigator';
import { Product} from '../../../domain/entities/product';
import MyIcon from '../../components/ui/MyIcon';
import { Formik } from 'formik';
//import { updateCreateProduct } from '../../../actions/products/update-create-product';
import ProductImages from '../../components/products/ProductImages';
import { genders, sizes } from '../../../config/constants/product-constants';

//const sizes: Size[] = [Size.Xs, Size.L, Size.S, Size.Xl, Size.Xxl, Size.M];
//const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];

interface Props extends StackScreenProps<RootStackParam, 'ProductScreen'> {}

const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  //const { productId } = route.params;
  const theme = useTheme();

  // useQuery
  const { isLoading, data: product, error } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60, //una hora
    queryFn: async () => {
      return await getProductById(productIdRef.current);
    },
  });

  const queryClient  = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product){
      productIdRef.current = data.id; // Creacion

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']}); // Hace que vuelva a cargar la data
      queryClient.invalidateQueries({queryKey: ['product', productIdRef.current]}); // Hace que vuelva a cargar la data
      //*para regresacar sin invalidar el query 
      // queryClient.setQueryData([ 'product', data.id], data);
        console.log(data)
    }
  });

  //useMutation

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik 
    
      initialValues={product} 
      onSubmit={mutation.mutate}
      
      >
      {/** Generar contenido interno */}
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subTitle={`${values.price}`}>
          <ScrollView style={styles.scrollView}>
            <Layout
              style= {styles.imgLayout}
            >
              <ProductImages images={values.images}/>
              {/*
                (values.images.length == 0)
                ? <Image 
                    source = { require('../../../assets/no-product-image.png')} 
                    style = {styles.defaultImage}
                  />
                :(
                  <FlatList
                    data={values.images}
                    keyExtractor={item => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <FadeInImage uri={item} style={styles.image} />
                    )}
                  />
                )
              */}
            </Layout>
            {/* Formulario */}
            <Layout style={styles.formContainer}>
              <Input
                label="Titulo"
                value={values.title}
                style={styles.formInput}
                onChangeText={handleChange('title')}
              />

              <Input
                label="Slug"
                value={values.slug}
                style={styles.formInput}
                onChangeText={handleChange('slug')}
              />

              <Input
                label="Description"
                value={values.description}
                style={styles.formInput}
                multiline
                numberOfLines={5}
                onChangeText={handleChange('description')}
              />
            </Layout>

            <Layout style={styles.formSmallContainer}>
              <Input
                label="Precio"
                keyboardType='numeric'
                value={values.price.toString()}
                style={styles.formSmallInput}
                onChangeText={handleChange('price')}
              />

              <Input
                label="Inventario"
                keyboardType='number-pad'
                value={values.stock.toString()}
                style={styles.formSmallInput}
                onChangeText={handleChange('stock')}
              />
            </Layout>
            {/*Selectores */}
            <ButtonGroup
              style={styles.selectorGroup}
              size="small"
              appearance="outline"
            >
              {sizes.map((size, index) => (
                <Button
                  key={index}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {' '}
                  {size}{' '}
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup
              style={styles.selectorGroup}
              size="small"
              appearance="outline"
            >
              {genders.map((gender, index) => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {' '}
                  {gender}{' '}
                </Button>
              ))}
            </ButtonGroup>
            {/*Boton de grabacion */}
            <Button
              accessoryLeft={<MyIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled = { mutation.isPending}
              style={styles.saveButton}
            >
              Guardar
            </Button>

            <Layout style={styles.separator} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
  formContainer: {
    marginHorizontal: 10,
  },

  formInput: {
    marginVertical: 5,
  },
  formSmallContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  formSmallInput: {
    flex: 1,
  },
  separator: {
    height: 200,
  },

  selectorGroup: {
    margin: 2,
    marginTop: 10,
    marginHorizontal: 15,
  },
  saveButton: {
    margin: 15,
  },

  imgLayout: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultImage: {
    width: 300,
    height: 100
  }
});
