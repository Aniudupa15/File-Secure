const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    email : String,
    password: String,
    ConfirmPassword: String
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;