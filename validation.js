import Joi from "@hapi/joi";

const loginValidation = data => {
        const schema = {
          username: 
              Joi.string()
              .min()
              .required(),
          email: 
              Joi.string()
              .required()
              .email(),
          password: 
              Joi.string()
              .min(6)
              .required(),
        };
}

const registerValidation = data => {
  const schema = {
    username: 
        Joi.string()
        .min()
        .required(),
    email: 
        Joi.string()
        .required()
        .email(),
    password: 
        Joi.string()
        .min(6)
        .required(),
  };
  return Joi.validate(data, schema);
};

export  {
    registerValidation,
    loginValidation
}
    
