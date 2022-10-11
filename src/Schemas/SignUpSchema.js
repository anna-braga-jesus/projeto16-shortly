import joi from "joi";

const SignUpSchema = joi.object({
  name: joi.string().min(4).empty().required(),
  email: joi.string().email().empty().required(),
  password: joi.string().min(1).empty().required(),
  confirmPassword: joi.ref("password"),
});

export default SignUpSchema;
