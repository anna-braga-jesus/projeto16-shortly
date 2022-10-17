import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";

async function listUsers(req, res) {
  const sum = res.locals.sum;
  const user = res.locals.user;

  try {
    
    const usersMe = await connection.query(
      `
      SELECT users.id, users.name, users.view, json_agg(
      json_build_object( 'id',
      urls.id,
      'shortUrl', urls."shortUrl",
      'url', urls.url,
                'visitCount', urls."visitCount"
      )
      ) AS "shortenedUrls"
            FROM users 
          LEFT JOIN urls ON users.id = urls."userId"
            WHERE users.id = $1 
          GROUP BY users.id;
          `,
      [user.id]
    );

    const hasUrl = usersMe.rows[0].shortenedUrls[0].id 
    if (hasUrl !== null) {
      return res.status(statusCode.OK).send(usersMe.rows[0]);
    } else {
      usersMe.rows.map( (value)=> value.shortenedUrls=[])
      return res.status(statusCode.OK).send(usersMe.rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

export default listUsers;
