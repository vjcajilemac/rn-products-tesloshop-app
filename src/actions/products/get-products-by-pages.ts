import { tesloAPi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";


export const getProductsByPage = async( page: number, limit: number = 20): Promise<Product[]> => {

    try{
        const {data} = await tesloAPi.get<TesloProduct[]>(`/products?offset=${ page * 10 }&limit=${ limit }`);
        const products = data.map(ProductMapper.tesloProductToEntity);
        return products;
    }catch(error){
        console.log(error);
        throw new Error('Error getting products');
    }
}