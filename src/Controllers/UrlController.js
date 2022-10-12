import statusCode from "../enums/statusCode.js";

async function createUrlShorten(){

  try {
    
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function listUrlsById(){
  
  try {
    
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

async function shortUrl(){

try {
  
} catch (error) {
  console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
}
}

async function deleteUrl(){
  const { Authorization } = req.header;
  try {
    
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}
export {listUrlsById, shortUrl, createUrlShorten, deleteUrl};