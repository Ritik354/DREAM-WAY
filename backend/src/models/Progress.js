import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Progress must belong to a user"],
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Progress must belong to a topic"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

progressSchema.index({ user: 1, topic: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
