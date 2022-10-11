import { connection } from "../Database/db.js";
import statusCodes from "../enums/statusCode.js";

async function SignIn(req, res) {
    const { email, senha} = req.body;
    
    try {
        res.send(statusCodes);
    } catch (error) {
        console.log(error);
        res.send(statusCodes);
    }

}

export { SignIn };