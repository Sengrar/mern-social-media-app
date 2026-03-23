import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["post", "announcement"],
        default: "post"
    },
    content: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// To set time and date format============
postSchema.set("toJSON", {
    transform: function (doc, ret) {
        const formatDate = (date) => {
            return new Date(date)
                .toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })
                // .replace(/\//g, "-");
        };

        ret.createdAt = formatDate(ret.createdAt);
        ret.updatedAt = formatDate(ret.updatedAt);

        return ret;
    }
});

export default mongoose.model("Post", postSchema);