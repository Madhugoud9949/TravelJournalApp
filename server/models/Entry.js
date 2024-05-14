import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Ensure 'User' matches the actual model name
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

const Entry = mongoose.model("Entry", EntrySchema);

// Error handling for schema creation
EntrySchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Duplicate entry. Please ensure unique fields.'));
  } else {
    next(error);
  }
});

export default Entry;
