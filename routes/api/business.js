const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const {
    addBusinessStaff,
    removeBusinessStaff,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessById,
    getBusinessOrg
} = require("../../controllers/business");


//Fire when businessId parameter is matched
//store the business details in req.business
router.param("businessId", getBusinessById);

// @route Get api/business
// @desc Get the organization of a manager
// @access Admin route
router.get("/", isSignedIn, isAdmin, getBusinessOrg);

// @route PUT api/business/add/:businessId/:user_id
// @desc Add staff to the business organization
// @access Admin route
router.put('/add/:businessId/:user_id', isSignedIn, isAdmin, addBusinessStaff)

// @route PUT api/business/remove/:businessId/:user_id
// @desc Remove staff from the business organization
// @access Admin route
router.put('/remove/:businessId/:user_id', isSignedIn, isAdmin, removeBusinessStaff)

// @route post api/business
// @desc Create new business organization
// @access Admin router
router.post("/", isSignedIn, isAdmin, createBusiness);

// @route post api/business/update/:businessId
// @desc Update or edit organization
// @access Admin route
router.put("/update/:businessId", isSignedIn, isAdmin, updateBusiness);

// @route post api/business/delete/:businessId
// @desc Delete the business Organization
// @access Admin route
router.delete("/delete/:businessId", isSignedIn, isAdmin, deleteBusiness);

module.exports = router;
