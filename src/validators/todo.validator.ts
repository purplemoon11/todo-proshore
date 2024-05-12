import Joi from "joi";

export const todoValidator = Joi.object({
  name: Joi.string().required(),
  shortDescription: Joi.string().required(),
  dateAndTime: Joi.string().isoDate().required(),
  status: Joi.string().valid("Upcoming", "Done").required(),
});
