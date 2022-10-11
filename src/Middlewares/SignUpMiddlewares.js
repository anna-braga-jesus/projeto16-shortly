import { connection } from "../Database/db.js";

function validateSignUp(req, res, next) {
    /* 
    - **[MUDANÇA]**
    - *Caso exista algum erro no formato do corpo enviado,
     responder com status code `422` e os erros correspondentes.*
        - *Considere erro no formato dos dados enviados quando:*
            1. *Valores vazios,*
            2. *Tipos diferentes de string,*
            3. *Nomes dos campos são `email,name,password,confirmPassord`*
            4. Os campos `*password e confirmPassord` devem ser iguais.*
    - Caso exista algum usuário cadastrado com o e-mail enviado no corpo da
     requisição, responder com *status code* `409`.
*/

}

export default validateSignUp;
