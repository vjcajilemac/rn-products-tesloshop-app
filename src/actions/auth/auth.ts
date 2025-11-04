import axios from "axios";
import { tesloAPi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infraestructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles
    }

    return{
        user,
        token: data.token
    }
}

export const authLogin = async(email: string, password: string) => {
    try{
        email = email.toLowerCase();
        console.log('email', email);
        /*
        fetch('http://192.168.0.176:3000/api/auth/login',{
            method: 'POST',
        headers: {
            'Content-Type': 'application/json', // avisamos que enviamos JSON
        },
        body: JSON.stringify({
           email,
                password
        }),
        }).then(response => response.json()) // transforma la respuesta en JSON
  .then(data => {
    console.log('dtd',data); // aquí tienes el objeto con los datos
  })
        */
        const {data} = await tesloAPi.post<AuthResponse>(
            '/auth/login',
            {
                email,
                password
            }
        );
        return returnUserToken(data);

    }catch(error){
        console.log(error)
        return null;
    }
}


export const authCheckStatus = async () => {
    try{
        const {data} = await tesloAPi.get<AuthResponse>('auth/check-status');
        return returnUserToken(data);
    }catch( error ){
        console.log(error);
        return null;
    }

}


export const authRegister = async(fullName: string, email: string, password: string) => {
    try{
        email = email.toLowerCase();

        const {data} = await tesloAPi.post<AuthResponse>(
            '/auth/register',
            {
                fullName,
                email,
                password
            }
        );
        return returnUserToken(data);

    }catch(error){
        if (axios.isAxiosError(error)) {
            console.log('Error status:', error.response?.status);
            console.log('Error data:', error.response?.data);
        } else {
            console.log(error);
        }

        console.log(error)
        return null;
    }
}