const complaint = require("../models/complaint");

const createComplaint = async (req, res) => {
  try {
    const { About, description, image } = req.body;

    if (!About && !description) {
      return res.status(400).json({
        msg: "Please Enter All the details carefully!!",
      });
    }

    const existingComplaint=complaint.findOne({
        About:About,
        description:description,
        image:image
    })

    if(existingComplaint){
         return res.status(400).json({
           msg: "Complaint already Submiited for these Meals",
        });
    }
    const createComplaint = new complaint({
      About: About,
      description: description,
      image: image,
    });

    const savedComplaint = await createComplaint.save();
    console.log("Complait saved", savedComplaint);

    return res.status(200).json({
      msg: "Complaint saved Successfully!!",
      data: savedComplaint,
    });
  } catch (error) {
    console.log("Error in the complaint Api", error.message);
    return res.status(501).json({
      msg: "Error in the complaint Api",
    });
  }
};

module.exports=createComplaint;
