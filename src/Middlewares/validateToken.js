import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";

async function validateToken(req, res, next) {
  const authorization = req.headers.authorization?.replace("Bearer ", "");
  try {
    if (authorization) {
      const findUserId = await connection.query(
        `SELECT "userId" FROM sessions WHERE token = $1;`,
        [authorization]
      );
      if (findUserId.rows.length !== 0) {
        const variable = findUserId.rows[0].userId;
        const userWithId = await connection.query(
          `SELECT * FROM users WHERE id = $1;`,
          [variable]
        );
        const user = userWithId.rows[0];
        delete user.password;
        res.locals.user = user;
      }else{
        return res.sendStatus(statusCode.UNAUTHORIZED);
      }
    } else {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
  next();
}

export { validateToken };
