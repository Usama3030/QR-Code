require("dotenv").config();
const ChecklistLocationModel = require("../Modals/formChecklist");

//create api

exports.createChecklistformChecklist = async (req, res) => {
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

exports.getChecklistformChecklistById = async (req, res) => {
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
exports.getAllChecklistformChecklist = async (req, res) => {
  try {
    const checklistLocation = await ChecklistLocationModel.find();
    res.json(checklistLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const problems = {problems:[]};
// const selectedProblem = problems.problems.filter(p =>p._id["$oid"] == "66a4242d3fcf35959a85747f").map(p => ({name: p.name, _id: p._id, category: p.categories.filter(c => c._id["$oid"] == "66a4242d3fcf35959a857480").map(d => ({name: d.name, _id: d._id,problem: d.problems.filter(e => e._id["$oid"] == "66a4242d3fcf35959a857481")[0]}))[0]}))[0];

// const currentProblem = {"name":"Problem 1","_id":{"$oid":"66a4242d3fcf35959a85747f"},"category":{"name":"Mess / Cleanliness","_id":{"$oid":"66a4242d3fcf35959a857480"},"problem":{"name":"Wet Floor","_id":{"$oid":"66a4242d3fcf35959a857481"}}}}
