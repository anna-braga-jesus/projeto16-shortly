import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";

async function listRanking(req, res) {
  const ranking = await connection.query(` SELECT users.id as id, users.name
  as name, COUNT(urls."userId") as visitcount, 
  SUM(urls.visitcount) as "VisitCount"
 FROM users
 LEFT JOIN urls ON urls.userid = users.id
 GROUP BY users.id
 ORDER BY "visitCount DESC LIMIT 10;`);

 const rankings = ranking.map(user => user.visitCount ? user : {...user, visitCount:0})
  try {
    res.status(statusCode.OK).send(rankings);
  } catch (error) {
    console.log(error);
    res.send(statusCode.SERVER_ERROR);
  }
}

export default listRanking;
