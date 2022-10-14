import { connection } from "../Database/db.js";
import SignUpSchema from "../Schemas/SignUpSchema.js";

function validateSignUp(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const model = SignUpSchema.validate(req.body, {
    abortEarly: false,
  });
  if (model.error) {
    const signUpError = model.error.details.map((e) => e.message);
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send(signUpError);
  }
  next();
}

export default validateSignUp;
