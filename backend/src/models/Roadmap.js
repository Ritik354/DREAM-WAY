import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a roadmap title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a roadmap description"],
      trim: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
