import Vulnerability from "../models/vulnerabilities.js";

export const showData = async (req, res) => {
  const source = req.query.source;
  console.log("Received request with source:", source); // Log the source

  try {
    if (!source) {
      return res
        .status(400)
        .json({ success: false, message: "Source is required." });
    }

    // Case-insensitive search in the database
    const vulnerabilities = await Vulnerability.find({
      source: { $regex: new RegExp(source, "i") }, // i makes it case-insensitive
    });

    if (vulnerabilities.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found for this source." });
    }

    res.status(200).json({ success: true, data: vulnerabilities });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  }
};
