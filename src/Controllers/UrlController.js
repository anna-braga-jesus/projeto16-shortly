import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";
import { nanoid } from "nanoid";

async function createUrlShorten(req, res) {
  const body = req.body;
  const findSession = res.locals.findSession;

  try {
    const shorturl = nanoid(8);
    await connection.query(
      `INSERT INTO urls (url, "shortUrl", "userId", "visitCount") VALUES ($1, $2, $3, $4);`,
      [body.url, shorturl, findSession.userId, 0]
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
      `SELECT id, "shortUrl", url FROM urls WHERE id = $1;`,
      [id]
    );
    if (list.rows.length === 0) return res.sendStatus(statusCode.NOT_FOUND);
    res.send(list.rows[0]).status(statusCode.OK);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function shortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlRigth = (
      await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
        shortUrl,
      ])
    ).rows[0];

    if (!urlRigth) {
      return res.sendStatus(statusCode.NOT_FOUND);
    }

    await connection.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    res.redirect([urlRigth.url]);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function deleteUrl(req, res) {
  const id = req.params.id;
  try {
    await connection.query("DELETE FROM urls WHERE id = $1;", [id]);
    res.sendStatus(statusCode.NO_CONTENT);
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}
export { listUrlsById, shortUrl, createUrlShorten, deleteUrl };
