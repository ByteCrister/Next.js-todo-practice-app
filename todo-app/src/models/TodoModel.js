import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Task cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [400, "Task cannot exceed 400 characters"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Incomplete"], 
      default: "Pending", 
    },
    taskDate: {
      type: Date,
      required: [true, "Task date is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

const TodoModel =  mongoose.models.Todos || mongoose.model("Todos", TodoSchema);
export default TodoModel;