import { connection } from "../Database/db.js";
import statusCodes from "../enums/statusCode.js";
import bcrypt from "bcrypt";

async function SignUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const passwordHashed = await bcrypt.hash(password, 10);

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
