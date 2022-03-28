import Joi from "@hapi/joi";

const loginValidation = Joi.object({
    username: 
        Joi.string()
        .min(4)
        .required(),
    password: 
        Joi.string()
        .min(6)
        .required(),
});

const registerValidation = Joi.object({
    username: 
        Joi.string()
        .min(5)
        .required(),
    email: 
        Joi.string()
        .required()
        .email(),
    password: 
        Joi.string()
        .min(8)
        .required(),
});

export {
    registerValidation,
    loginValidation
}