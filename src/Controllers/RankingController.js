import statusCode from "../enums/statusCode.js";

async function listRanking(){

    
    try {
        
    } catch (error) {
        console.log(error);
        res.send(statusCode.SERVER_ERROR);
        
    }
}

export default listRanking;
