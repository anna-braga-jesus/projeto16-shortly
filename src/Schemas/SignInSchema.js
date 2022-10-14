import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().empty().required(),
});

export {signInSchema};