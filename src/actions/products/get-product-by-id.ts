import { tesloAPi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    'description': '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: []
}

export const getProductById = async(id: string): Promise<Product | null> =>{
    if( id === 'new') return emptyProduct;
    try{
        const { data } = await tesloAPi.get<TesloProduct>(`/products/${id}`)
        return ProductMapper.tesloProductToEntity(data);
    }catch(error){
        console.log(error);
        throw new Error("Error getting product by id");
        
        //return null;
    }
}