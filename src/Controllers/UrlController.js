import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";
import { nanoid } from "nanoid";

async function createUrlShorten(req, res) {
  const body = req.body;
  const findUrl = res.locals.findUrl;
  const findSession = res.locals.findSession.rows[0].userId;
  console.log(
    "🚀 ~ file: UrlController.js ~ line 9 ~ createUrlShorten ~ findSession",
    findSession
  );
  try {
    const shorturl = nanoid();
    await connection.query(
      "INSERT INTO urls (url, shorturl,userid, visitcount, createdat) VALUES ($1, $2, $3, $4, $5);",
      [body.url, shorturl, findSession, 0, new Date().toUTCString()]
    );
    return res.status(statusCode.OK).send({ shorturl: shorturl });
  } catch (error) {
    console.log(error);
    return res.status(statusCode.SERVER_ERROR);
  }
}

async function listUrlsById(req, res) {
  const { id } = req.params;
  try {
    const list = await connection.query(
      `SELECT id, shorturl, url FROM urls WHERE id = $1;`,
      [id]
    );
    console.log(Number(id), shortUrl, list.rows[0]);
    if (list.rows.length === 0) return res.sendStatus(statusCode.NOT_FOUND);
    res.status(statusCode.OK).send(list.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function shortUrl(req, res) {
  const { shorturl } = req.params;
  const body = req.body;
  try {
    const urlRigth = await connection.query(
      "SELECT * FROM urls WHERE shorturl = $1;",
      [shorturl]
    );

    if (urlRigth.rows.length === 0) return res.sendStatus(statusCode.NOT_FOUND);

    const updateVisitCount = await connection.query(
      'UPDATE urls SET visitcount = $1 WHERE "shorturl" = $2;',
      [body.visitcount + 1, body.shorturl]
    );
    console.log(body.VisitCount + 1, body.shorturl);
    res.redirect([updateVisitCount.rows[0]]);
    res.sendStatus(statusCode.OK);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function deleteUrl() {
  const { Authorization } = req.header;

  try {
    const urlDeleted = await connection.query('SELECT FROM urls WHERE id = $1;', [id]) //DELETE FROM ...
    res.sendStatus(statusCode.NO_CONTENT);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}
export { listUrlsById, shortUrl, createUrlShorten, deleteUrl };
