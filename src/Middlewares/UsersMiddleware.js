import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";


async function validateUsers(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    if (!token) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }
    const findSession = await connection.query(
      "SELECT * FROM sessions WHERE token = $1;",
      [token]
    );
    if (!findSession.rows[0]) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    };
    res.locals.findSession = findSession.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }


}

export { validateUsers };
