import { Router } from 'express';
import Carts from '../dao/dbManager/carts.dbManager.js';

const router = Router();
const cartManager = new Carts();

router.post('/', async (req, resp) => {
    try {
        const result = await cartManager.save();
        resp.send({ status: 'Success', payload: result});

    } catch (error) {
        resp.status(500).send({ error: 'Error', error })
    };
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const result = await cartManager.getById(pid);
        res.send({ status: 'Success', payload: result });
        console.log(result);
    } catch (error) {
        res.status(500).send({ error: 'Error', error });
    };
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const result = await cartManager.addProductToCart(cid, pid);
        res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(500).send({ error: 'Error', error });
    };
});

export default router;