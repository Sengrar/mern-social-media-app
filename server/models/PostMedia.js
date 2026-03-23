import mongoose from "mongoose";

const postMediaSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true
    }
}, {
    timestamps: true
});

// To set time and date format============
postMediaSchema.set("toJSON", {
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

export default mongoose.model("PostMedia", postMediaSchema);