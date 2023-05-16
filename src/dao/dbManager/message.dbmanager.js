import { messageModel } from "../models/messages.model.js";

export default class Messages {

    constructor() {
        console.log('Working Messages with DB');
    };

    async addMensagger(message) {
        const result = await messageModel.create(message);
        return result;
    };

    async getMessage() {
        const result = await messageModel.find().lean();
        return result;
    };
};