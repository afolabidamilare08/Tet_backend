const Joi = require('joi');

// this file contains all the form validatiors of the projects

const validator = schema => (payload) => schema.validate(payload)

// formvalidation for adding sector
const addSectorSchema = Joi.object({
    sector_name: Joi.string().min(4).max(30).required(),
    sector_sub: Joi.array().required(),
})


// formvalidation for adding sector
const addUserSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    sectors: Joi.array().required(),
    agree_to_terms: Joi.boolean().required(),
})

exports.validateAddSector = validator(addSectorSchema)
exports.validateAddUser = validator(addUserSchema)

