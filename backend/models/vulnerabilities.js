import mongoose from "mongoose";

const vulnerabilitySchema = new mongoose.Schema(
  {
    CVE: { type: String, required: true }, // No longer unique
    title: { type: String, required: true },
    severity: { type: String, required: true },
    publishedDate: { type: String, required: true },
    documentId: { type: String, default: null }, // Allow null for documentId
    detailLink: { type: String, required: true },
    updateDate: { type: String, default: null }, // Allow null for updateDate
    source: { type: String, required: true },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const Vulnerability = mongoose.model("Vulnerability", vulnerabilitySchema);

export default Vulnerability;
