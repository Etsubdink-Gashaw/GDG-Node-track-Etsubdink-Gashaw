import Joi from "joi";


const schema = Joi.object({
    title: Joi.string().min(2).required(),
    price: Joi.number().min(0).required()
});

export default schema;


