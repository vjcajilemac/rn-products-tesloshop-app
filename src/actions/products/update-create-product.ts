import { isAxiosError } from "axios";
import { tesloAPi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";



export const updateCreateProduct = (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);
    console.log('update create');
    if(product.id && product.id !== 'new'){
        return updateProduct(product);
    }

    return createProduct(product);
    //throw new Error("Creacion no esta implementada");
    
}

const createProduct = async(product: Partial<Product>) =>{
    try{
        const {id, images = [], ...rest} = product;
        const checkedImages = prepareImages(images);

        const {data} = await tesloAPi.post(`/products`, {
            images: checkedImages,
            ...rest
        })

        return data;

    }catch(error){
        if(isAxiosError(error)){
            console.log(error.response?.data);
        }
        throw new Error("Error al actualziar productos");
        

    }

}

//Todo: revisar si viene el usuario

const updateProduct = async(product: Partial<Product>) => {
    console.log(product);
    try{
        const {id, images = [], ...rest} = product;
        const checkedImages = prepareImages(images);

        const {data} = await tesloAPi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })

        return data;

    }catch(error){
        if(isAxiosError(error)){
            console.log(error.response?.data);
        }
        throw new Error("Error al actualziar productos");
        

    }

}


const prepareImages = ( images: string[]) => {
    // TODO: revisar los FILES
    return images.map((image) => image.split('/').pop())
}