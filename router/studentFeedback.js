const Feedback = require("../models/feedback");

const FeedbackCreation = async (req, res) => {
  try {
    const { feedback, suggestions, image, meal, rating, submissionDate } =
      req.body;

    if (!feedback || !suggestions || !meal || !rating || !submissionDate) {
      return res.status(400).json({
        msg: "Please Enter All the details carefully!!",
      });
    }

    const feedbackCheck=await Feedback.findOne({
         student:req.user._id,
         submissionDate:submissionDate,
         meal:meal
    })

    if(feedbackCheck){
        return res.status(400).json({
           msg: "Feedback already Submiited for these Meals",
        });
    }

    const createFeedback = new Feedback({
          feedback: feedback,
          suggestions: suggestions,
          image: image,
          meal:meal,
          student: req.user._id,
          rating:rating,
          submissionDate:submissionDate
        });

      const savedFeedback=await createFeedback.save()  ;
      console.log("savedFeedback",savedFeedback);

      return res.status(200).json({
         msg: "Feedback submited Successfully!!",
         data: savedFeedback,
      });

  } catch (error) {
    console.log("Error in the Feedback leave api", error.message);
    return res.status(501).json({
      msg: "Error in the Feedback  Api!!",
    });
  }
};

module.exports = FeedbackCreation;
