const express = require("express");

const {authenticate} = require("../middleware/auth.js");

const {
    checkOwnership,
    getApartments,
    getApartment,
    createApartment,
    updateApartment,
    deleteApartment,
    getTenants,
    getTenant,
    createTenant,
    updateTenant,
    deleteTenant,
    getFeedbacks,
    getFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback
} = require("../middleware/owner.js");

const router = express.Router();

router.use(authenticate);

router.get("/" , checkOwnership, getApartments);
router.get("/:id", checkOwnership, getApartment);
router.post("/" , createApartment);
router.put("/:id" , checkOwnership , updateApartment);
router.delete("/:id" , checkOwnership , deleteApartment);

router.get("/:id/tenants" , checkOwnership , getTenants);
router.get("/:id/tenants/:tenantId" , checkOwnership , getTenant);
router.post("/:id/tenants" , checkOwnership , createTenant);
router.put("/:id/tenants/:tenantId" , checkOwnership , updateTenant);
router.delete("/:id/tenants/:tenantId" , checkOwnership , deleteTenant);

router.get("/:id/feedbacks" , checkOwnership , getFeedbacks);
router.get("/:id/feedbacks/:feedbackId" , checkOwnership , getFeedback);
router.post("/:id/feedbacks" , createFeedback);
router.put("/:id/feedbacks/:feedbackId" , checkOwnership , updateFeedback);
router.delete("/:id/feedbacks/:feedbackId" , checkOwnership , deleteFeedback);

module.exports = router;
