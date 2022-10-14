import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";
import UrlSchema from "../Schemas/UrlSchema.js";

async function validateUrl(req, res, next) {
  const { url, shorturl, email } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    if (!token) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }

    const formatUrl = UrlSchema.validate(req.body, {
      abortEarly: false,
    });
    if (formatUrl.error) {
      const urlError = formatUrl.error.details.map((e) => e.message);
      return res.status(statusCode.UNPROCESSABLE_ENTITY).send(urlError);
    }

    const findSession = await connection.query(
      "SELECT * FROM sessions WHERE token = $1;",
      [token]
    );
    if (!findSession.rows[0]) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }
    let url;
    const findUrl = await connection.query(
      "SELECT * FROM urls  WHERE url = $1 AND userid = $2;",
      [url, findSession.userid]
    );
    if (findUrl.rows[0]) {
      return res.sendStatus(statusCode.CONFLICT);
    }
    res.locals.findUrl = findUrl
    res.locals.findSession= findSession
  
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
  console.log("Qualquer coisa")
  next();
}
async function validateDelete(req, res, next){
  const id  = req.params.id;
  console.log("Esse é o id:",id);
try {
const existsShortUrl = await connection.query('SELECT * FROM links WHERE id = $1;', [id]).rows[0];

  if (existsShortUrl.length === 0) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  if (existsShortUrl[0].userId !== user.id) {
    return res.sendStatus(statusCode.UNAUTHORIZED);
  }
res.send(id)
} catch (error) {
  console.log(error);
  res.send(statusCode.SERVER_ERROR);
}

  next();
}
export { validateUrl, validateDelete};
