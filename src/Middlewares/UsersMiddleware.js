import statusCode from "../enums/statusCode";

function validateUsers(req, res, next) {
  const { Authorization } = req.header;

  try {
    /*- Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
- Caso o usuário não exista, responder com *status code* `404`.*/
  } catch (error) {
    console.log(error);
    res.sendStatus(statusCode.SERVER_ERROR);
  }
}

export { validateUsers};
