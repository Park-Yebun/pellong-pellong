const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    // 연결 id 정보
    token: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("User", userSchema);