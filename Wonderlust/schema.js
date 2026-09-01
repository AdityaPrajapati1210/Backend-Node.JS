const joi = require('joi');

module.exports.reviewSchema = joi.object({
        comment: joi.string().required(),
        rating:joi.number().required()
}).required();