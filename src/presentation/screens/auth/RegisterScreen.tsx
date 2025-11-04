import { Alert, StyleSheet, useWindowDimensions} from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import MyIcon from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParam } from '../../navigations/StackNavigator'
import { useAuthStore } from '../../store/auth/useAuthStore'

interface Props extends StackScreenProps<RootStackParam, 'RegisterScreen'>{}


const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isPosting, setIsPosting] = useState(false);
  const {fullName, email, password} = form;
  const {register} = useAuthStore();

  const onRegister = async() => {
    if( email.length === 0 || password.length === 0){
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await register(fullName, email, password);
    console.log('wasSuccessful', wasSuccessful)
    setIsPosting(false);    
    if(wasSuccessful) return;

    Alert.alert('Error', 'Error en el guardado del usuario');

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollView: {
      marginHorizontal: 40
    },
    titleContainer: {
      paddingTop: height * 0.35,
    },
    formContainer: {
      marginTop: 20,
      paddingBottom: 50
  
    },
  
    inputs:{
      marginTop: 10
    },
  
    footerContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center'
    }
    
  })
  return (
    <Layout
          style={styles.container}
        >
          <ScrollView
            style= {styles.scrollView}
          >
            <Layout
              style= {styles.titleContainer}
            >
              <Text category='h1'> Registrarse </Text>
              <Text category='p2'>Crea una cuenta en el sistema...</Text>
            </Layout>
            <Layout
              style= {styles.formContainer}
            >
              <Input
                accessoryLeft={<MyIcon name = 'person-outline'/>}
                placeholder='Nombre'
                value={fullName}
                onChangeText={value => setForm({...form, fullName: value})}
                style={styles.inputs}
              />
              
              <Input
                accessoryLeft={<MyIcon name = 'email-outline'/>}
                placeholder='Correo '
                keyboardType='email-address'
                autoCapitalize='none'
                value= {email}
                onChangeText={value => setForm({...form, email: value})}
                style={styles.inputs}
              />
    
              <Input
                accessoryLeft={<MyIcon name='lock-outline'/>}
                placeholder='Contrasena'
                autoCapitalize='none'
                secureTextEntry
                value = {password}
                onChangeText={value => setForm({...form, password: value}) }
                style={styles.inputs}
              />
    
            </Layout>
    
            <Layout>
              <Button
                disabled={isPosting}
                accessoryRight={<MyIcon name='arrow-forward-outline' white= {true}/> }
                onPress={onRegister}
                //appearance='ghost'
              >
                Crear usuario
              </Button>
            </Layout>
            <Layout
              style= {styles.footerContainer}
            >
    
              <Text>Ya tienes Cuenta? </Text>
              <Text 
                status='primary' 
                category='s1'
                onPress={() => navigation.pop()/*pop o goBack() */}
              >Inicia sesion</Text>
    
            </Layout>
          </ScrollView>
        </Layout>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})