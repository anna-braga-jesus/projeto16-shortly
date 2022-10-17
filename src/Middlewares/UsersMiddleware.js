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
    //Caso o usuário não exista, responder com status code 404.
    //De onde vem esse userId?
    
     //const validateUser = await connection.query('SELECT * FROM users WHERE id = $1', [userId]);
     //if( !validateUser) return res.sendStatus(statusCode. NOT_FOUND);
    res.locals.findSession = findSession.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }


}

export { validateUsers };
