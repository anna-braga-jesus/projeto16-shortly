import { connection } from "../Database/db.js";
import SignUpSchema from "../Schemas/SignUpSchema.js";
import statusCodes from "../enums/statusCode.js";
import bcrypt from "bcrypt";

async function SignUp(req, res) {
  const { Authorization } = req.header;
  const { name, email, password, confirmPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const model = SignUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (model.error) {
      const signUpError = model.error.details.map((e) => e.message);
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).send(signUpError);
    }

    const doubleEmail = await connection.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (doubleEmail.rows[0]) {
      return res.sendStatus(statusCodes.CONFLICT);
    }
    const newUser = await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [name, email, passwordHashed]
    );
    return res.status(statusCodes.CREATED).send("Usuário criado com sucesso!");
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCodes.SERVER_ERROR);
  }
}

export { SignUp };
