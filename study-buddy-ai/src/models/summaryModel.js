import mongoose, { Schema } from "mongoose";

const summarySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    extractedText:{
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    }
},
{
    timestamps: true
}
)

const Summary = mongoose.model.summary || mongoose.model("summary", summarySchema);
export default Summary