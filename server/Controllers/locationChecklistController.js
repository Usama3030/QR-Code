require("dotenv").config();
const ChecklistLocationModel = require("../Modals/locations");

//create api

exports.createChecklistLocation = async (req, res) => {
  try {
    const checklistLocationData = req.body;
    const newChecklistLocation = new ChecklistLocationModel(
      checklistLocationData
    );
    await newChecklistLocation.save();
    res.status(201).json({
      message: "Checklist Added Successfully.",
      checklistLocation: newChecklistLocation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get APi

exports.getChecklistLocationById = async (req, res) => {
  try {
    const checklistTypeId = req.params.checklistTypeId;
    const checklistType = await ChecklistLocationModel.findById(
      checklistTypeId
    );

    if (!checklistType) {
      return res.status(402).json({ error: "Checklist Location not found" });
    }

    res.json(checklistType);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching Checklist Location. " });
  }
};

// get all checklists
exports.getAllChecklistLocation = async (req, res) => {
  try {
    const checklistLocation = await ChecklistLocationModel.find();
    res.json(checklistLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
