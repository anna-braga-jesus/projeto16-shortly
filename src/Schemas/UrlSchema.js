import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string()
  .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
  .required(),
  shortUrl: Joi.string()
}).options({ abortEarly: false })

export default urlSchema;
