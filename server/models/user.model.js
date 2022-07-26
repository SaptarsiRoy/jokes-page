// import mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // regex to validate email
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// hash the password before saving using bcrypt
userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

// compare passwords using bcrypt
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// export user model
module.exports = mongoose.model('User', userSchema);