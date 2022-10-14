import { connection } from "../Database/db.js";
import statusCode from "../enums/statusCode.js";

async function listUsers(){

    
    try {

        const ranking = await connection.query();


        res.sendStatus(statusCode.OK);
    } catch (error) {
        console.log(error);
        res.sendStatus(statusCode.SERVER_ERROR);
    }
}

export default listUsers;
