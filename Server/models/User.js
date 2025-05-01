const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure email uniqueness
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password should be at least 8 characters long"]
    }
}, { timestamps: true }); // Add timestamps to track creation & updates

// Add confirmPassword virtual field
UserSchema.virtual('confirmPassword')
    .get(function () { 
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });

// Validate confirmPassword
UserSchema.pre('validate', function (next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified

    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
