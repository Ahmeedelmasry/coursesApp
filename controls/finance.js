const financeSchema = require("../models/finance");
const userSchema = require("../models/signup");
const configSchema = require("../models/configrations");
// const orderSchema = require("../models/orders");

const updateFinance = async (req, res) => {
  try {
    //Get Config percentage
    const getPercentage = await configSchema.find();
    const percentage = getPercentage[0].percentage;
    const sendToFinance = await financeSchema.create({
      buyerId: req.body.buyerId,
      instructorId: req.body.instructorId,
      courseId: req.body.courseId,
      paymentAmount: req.body.paymentAmount,
      placedAt: Date.now(),
      safeAmount: req.body.paymentAmount * `.${percentage}`,
      safePercentage: percentage,
    });
    await sendToFinance.save();
    res.status(200).json({ update: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

module.exports = { updateFinance };
