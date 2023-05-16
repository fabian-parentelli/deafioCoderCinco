import { productModel } from '../models/products.model.js';

export default class Products {
    
    constructor() {
        console.log('Working Products with DB');
    };

    save = async (product) => {
        const producta = await productModel.create(product);
        return producta;
    };

    getAll = async (limit) => {
        const products = await productModel.find().limit(limit).lean();

        if(products) {
            return products;
        } else {
            return [];
        };
    };

    getById = async (id) => {
        const product = await productModel.findOne({_id : id}).lean();

        if(!product) {
            return {status: 'error', error: 'Product not found'};
        } else {
            return product;
        };
    };

    getByCode = async (code) => {
        const product = await productModel.find({code : code});
        if(product.length) {
            return {status: 'error', error: 'The code is repeted'};
        };
    };

    updateById = async (id, product) => {
        const productUpdate = await productModel.updateOne({ _id : id }, product);
        return productUpdate;
    };

    deleteById = async (id) => {
        const product = await productModel.deleteOne({_id : id});
        return product;
    };
};