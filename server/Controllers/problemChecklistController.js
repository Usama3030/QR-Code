require("dotenv").config();
const ChecklistProblemModel = require("../Modals/problems");

//create api

// exports.createChecklistProblem = async (req, res) => {
//   try {
//     const checklistProblemData = req.body;
//     console.log(checklistProblemData);
//     const newChecklistProblem = new ChecklistProblemModel(checklistProblemData);
//     await newChecklistProblem.save();
//     res.status(201).json({
//       message: "Checklist Added Successfully.",
//       checklistProblem: newChecklistProblem,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createChecklistProblem = async (req, res) => {
  try {
    const checklistProblemData = req.body;

    // Validate that the incoming data matches the expected structure
    if (
      !Array.isArray(checklistProblemData.problems) ||
      checklistProblemData.problems.length === 0
    ) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // console.log(JSON.stringify(checklistProblemData, null, 2))

    const newChecklistProblem = new ChecklistProblemModel(checklistProblemData);
    await newChecklistProblem.save();

    res.status(201).json({
      message: "Checklist Added Successfully.",
      checklistProblem: newChecklistProblem,
    });
  } catch (error) {
    console.error(error.message); // Log the error message for debugging
    res.status(500).json({ error: error.message });
  }
};

//Get APi

exports.getChecklistProblemById = async (req, res) => {
  try {
    const checklistTypeId = req.params.checklistTypeId;
    const checklistType = await ChecklistProblemModel.findById(checklistTypeId);

    if (!checklistType) {
      return res.status(402).json({ error: "Checklist Problem not found" });
    }

    res.json(checklistType);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching Checklist Problem. " });
  }
};

// get all checklists
exports.getAllChecklistProblem = async (req, res) => {
  try {
    const checklistProblem = await ChecklistProblemModel.find();
    res.json(checklistProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
