const express = require("express");

const {authenticate} = require("../middleware/auth.js");

const {
    checkOwnership,
    viewDashboard,
    getFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    viewPayments,
    makePayment
} = require("../middleware/tenant.js");

const router = express.Router();

router.use(authenticate);

router.get("/dashboard" , viewDashboard);
router.get("/feedbacks" , getFeedbacks);
router.post("/feedbacks" , createFeedback);
router.put("/feedbacks/:feedbackId" , updateFeedback);
router.delete("/feedbacks/:feedbackId" , deleteFeedback);
router.get("/payments" , viewPayments);
router.post("/payments" , makePayment);

module.exports = router;