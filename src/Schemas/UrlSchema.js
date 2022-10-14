import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
  shortUrl: Joi.string(),
});

export default urlSchema;
