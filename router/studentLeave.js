const Leave = require("../models/leave");

const applyLeave = async (req, res) => {
  try {
  
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        msg: "Please Enter All the details carefully!!",
      });
    }

    // 15 feb se 18 feb
    // start date agar 18 ko ho gya ar end date 15 ko toh impossible h
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return res.status(400).json({
        msg: "Start date cannot be after end date",
      });
    }
    // 15 feb se 18 feb
    // 16 feb se 17 feb
    // yeh dono date ko db mai check krega ar allowd kr dega par real life m jab
    // student 15 se 18 chuthi liya h toh wo wapas 16 se 17 chuthi q lega

    const existingLeave = await Leave.findOne({
      student: req.user._id,
      startDate: { $lte: end },
      endDate: { $gte: start },
    });

    if (existingLeave) {
      return res.status(400).json({
        msg: "Leave already applied for these dates",
      });
    }
    const createLeave = new Leave({
      startDate: start,
      endDate: end,
      reason: reason,
      appliedDate: new Date(),
      student: req.user._id,
    });
    console.log("createLeave", createLeave);
    const savedLeave = await createLeave.save();
    console.log("savedLeave is ", savedLeave);
    return res.status(200).json({
      msg: "Leave Applied Successfully!!",
      data: savedLeave,
    });
  } catch (error) {
    console.log("Error in the apply leave api", error.message);
    return res.status(501).json({
      msg: "Error in the Apply Leave Api!!",
    });
  }
};

module.exports = applyLeave;
