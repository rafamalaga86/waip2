import joi from 'joi';

const spanish_characters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]*$/;

export const userValidator = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
  first_name: joi.string().pattern(spanish_characters).min(3).max(30).required().messages({
    'string.pattern.base': '"First Name" should contain only letters or spaces',
  }),
  last_name: joi.string().pattern(spanish_characters).min(3).max(30).required().messages({
    'string.pattern.base': '"Last Name" should contain only letters or spaces',
  }),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().strip().min(8).max(30).required(),
});
