import { connection } from "../Database/db.js";
import jwt from "jsonwebtoken";
import statusCodes from "../enums/statusCode.js";
import bcrypt from "bcrypt";
import SignInSchema from "../Schemas/SignInSchema.js";

async function SignIn(req, res) {
  const { email, password } = req.body;
  const id = res.locals.id;
  
  try {
    const users = await connection.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (
      bcrypt.compareSync(password, users.rows[0].password) ||
      !users.rows[0]
    ) {
      return res.sendStatus(statusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ id }, "oi", {
      expiresIn: "2d",
    });

    //- Caso o usuário/senha não seja compatível (ou não exista), retornar o *status code* `401`.
    if (users.rowCount == 0) {
      return res.sendStatus(statusCodes.UNAUTHORIZED);
    }

    const loginModel = SignInSchema.validate(req.body, {
      abortEarly: false,
    });
    if (loginModel.error) {
      const signInError = loginModel.error.details.map((e) => e.message);
      return res.sendStatus(statusCodes.UNPROCESSABLE_ENTITY);
    }

    const login = await connection.query(
      `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
      [token, users.rows[0].id]
    );
    res.status(statusCodes.OK).send({ token: token });
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCodes.SERVER_ERROR);
  }
}

export { SignIn };
