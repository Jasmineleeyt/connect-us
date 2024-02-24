// Import required objects from mongoose library
const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please provide a valid email.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    // Enable virtuals
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property that gets the friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize user model
const User = model('user', userSchema);

model.exports = User;