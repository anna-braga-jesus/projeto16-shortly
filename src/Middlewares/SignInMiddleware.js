import { connection } from "../Database/db.js";
import statusCodes from "../enums/statusCode.js";
import { signInSchema } from "../Schemas/SignInSchema.js";
import bcrypt from "bcrypt";

async function validationSchema(req, res, next) {
  const { email, password } = req.body;

  const loginModel = signInSchema.validate(req.body, {
    abortEarly: false,
  });
  if (loginModel.error) {
    const signInError = loginModel.error.details.map((e) => e.message);
    res.status(statusCodes.UNPROCESSABLE_ENTITY).send(signInError);
    return;
  }
  next();
}

async function searchAUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const users = (
      await connection.query("SELECT * FROM users WHERE email = $1;", [email])
    ).rows[0];

    if (!users) return res.sendStatus(statusCodes.UNAUTHORIZED);
     if (users.length === 0) {
       return res.sendStatus(statusCodes.UNAUTHORIZED);
     }
    if (!bcrypt.compareSync(password, users.password)) {
      return res.sendStatus(statusCodes.UNAUTHORIZED);
    }

    res.locals.users = users;
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCodes.SERVER_ERROR);
  }

  next();
}

export { validationSchema, searchAUser };
