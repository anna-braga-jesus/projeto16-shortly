import joi from "joi";

const SignInSchema = joi.object({
  email: joi.string().email().empty().required(),
  password: joi.string().min(1).empty().required(),
});

export default SignInSchema;