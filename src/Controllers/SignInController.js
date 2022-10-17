import { connection } from "../Database/db.js";
import jwt from "jsonwebtoken";
//import { v4 as uuid } from "uuid";
import statusCodes from "../enums/statusCode.js";
import dotenv from "dotenv";

async function SignIn(req, res) {
  const users = res.locals.users;
  const usersId = users.id;
  try {
    const token = jwt.sign({ data: usersId }, process.env.TOKEN_SECRET, {
      expiresIn: "2d",
    });
    const searchToken = await connection.query(
      "SELECT * FROM sessions WHERE token = $1;",
      [token]
    );
    const verifyToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      function (error, decoded) {
        if (error) return res.sendStatus(statusCodes.UNAUTHORIZED);
      }
    );
    //if (!verifyToken) return res.sendStatus(statusCodes.UNAUTHORIZED);

    const login = await connection.query(
      `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
      [token, users.id]
    );
    return res.status(statusCodes.OK).send({ token: token });
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCodes.SERVER_ERROR);
  }
}

export { SignIn };
