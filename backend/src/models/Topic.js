import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a resource title"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Please provide a resource URL"],
      trim: true,
    },
  },
  { _id: false },
);

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a topic title"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    resources: [resourceSchema],
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Topic must belong to a module"],
    },
    order: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
