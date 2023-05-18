import express from "express";
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import mongoose from "mongoose";
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import Messages from "./dao/dbManager/message.dbmanager.js";

const messageManager = new Messages();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

try {
    await mongoose.connect('mongodb+srv://fabianparentelli007code:MU8O6JWQtjzskwZE@clusterfabian.kpwq3c1.mongodb.net/ecommerce?retryWrites=true&w=majority');

    console.log('Conected DB');

} catch (error) {
    console.error(error);
};


const server = app.listen(8080, () => console.log('Server runing in port 8080'));
const io = new Server(server);

const arrayData = []
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', async data => {
        const messages = await messageManager.addMensagger(data);
        arrayData.push(messages);
        io.emit('messagesLogs', arrayData);
    });

    socket.on('authenticated', async data => {
        const messages = await messageManager.getMessage();
        socket.emit('messagesLogs', messages);
        console.log(messages);

        socket.broadcast.emit('newUserConnected', data);
    });
});