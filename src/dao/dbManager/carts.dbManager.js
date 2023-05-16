import e from 'express';
import { cartModel } from '../models/carts.model.js';
import Products from './products.dbManager.js';

const productmanager = new Products();

export default class Carts {

    constructor() {
        console.log('Working Carts with DB');
    };

    save = async () => {
        const cart = { products: [] };
        const result = await cartModel.create(cart);
        return result;
    };

    getById = async (id) => {
        const cart = await cartModel.find({ _id: id }).lean();
        if (!cart) {
            return { status: 'error', error: 'Cart not found' };
        } else {
            return cart;
        };
    };

    update = async (id, cart) => {
        const result = await cartModel.updateOne({ _id: id }, cart);
        return result;
    };

    addProductToCart = async (cid, pid) => {

        const cart = await cartModel.findOne({_id : cid});
        const product = await productmanager.getById(pid);

        const exist = cart.products.findIndex( pro => pro._id.toString() === product._id.toString());
        
        if(exist !== -1) {
            cart.products[exist].quantity++;
        } else {
            cart.products.push(product._id);
        };

        const result = await this.update(cart._id, cart);
        return result;
    };
};