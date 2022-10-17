import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";

async function listRanking(req, res) {
  const ranking = (
    await connection.query(`
  SELECT users.id, 
  users.name,
  COUNT(urls) AS "linksCount",
  users.view AS "visitCount"
  FROM users
  LEFT JOIN urls ON urls."userId" = users.id
  GROUP BY users.id
  ORDER BY "visitCount" DESC
  LIMIT 10;`)
  ).rows;
  
  try {
    res.status(statusCode.OK).send(ranking);
  } catch (error) {
    console.log(error);
    res.send(statusCode.SERVER_ERROR);
  }
}

export default listRanking;
