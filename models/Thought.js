// Import required objects from mongoose library and import dayjs
const { Schema, Types, model } = require('mongoose');
const dayjs = require('dayjs');

// Reaction schema
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            date: Date.now,
            get: (dateTime) => {
                return dayjs(dateTime).format(`YYYY-MM-DD at hh:mma`);
            },
        },
    }
)

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateTime) => {
                return dayjs(dateTime).format(`YYYY-MM-DD at hh:mma`);
            },
        },
        username: {
            type: String,
            requried: true,
        },
        reactions: [reactionSchema],
    },
);

// Initialize though model
const Thought = model ('thought', thoughtSchema);

model.exports = Thought;