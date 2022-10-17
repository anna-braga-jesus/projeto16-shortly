import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";
import UrlSchema from "../Schemas/UrlSchema.js";

async function validateUrl(req, res, next) {
  const { url } = req.body;
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
      return res.send(urlError).status(statusCode.UNPROCESSABLE_ENTITY);
    }

    const findSession = await connection.query(
      "SELECT * FROM sessions WHERE token = $1;",
      [token]
    );
    if (!findSession.rows[0]) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }

    const findUrl = await connection.query(
      `SELECT * FROM urls WHERE url = $1 AND "userId" = $2;`,
      [url, findSession.rows[0].userId]
    );
    if (findUrl.rowCount > 0) {
      return res.sendStatus(statusCode.CONFLICT);
    }
    res.locals.findUrl = findUrl;
    res.locals.findSession = findSession.rows[0];
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
  next();
}

async function validateDelete(req, res, next) {
  const id = req.params.id;
  const user = res.locals.user;
  try {
    const findShortUrl = await connection.query(
      `SELECT * FROM urls WHERE id = $1;`,
      [id]
    );
    const existsShortUrl = findShortUrl.rows[0];

    if (!existsShortUrl === 0) {
      return res.sendStatus(statusCode.NOT_FOUND);
    }
    const listOfUrls = await connection.query(
      `SELECT * FROM urls WHERE id = $1 AND "userId" = $2;`,
      [id, user.id]
    );
    if (listOfUrls === 0) return res.send(statusCode.NOT_FOUND);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
  next();
}

async function sumViews(req, res, next) {
  const user = res.locals.user;

  try {
    const all = await connection.query(
      `SELECT "visitCount" FROM urls WHERE "userId" = $1;`,
      [user.id]
    );
    const allViews = all.rows;
    let sum = 0;
    allViews.map((element) => {
      sum += element.visitCount;
    });

    res.locals.sum = sum;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

export { validateUrl, validateDelete, sumViews };
