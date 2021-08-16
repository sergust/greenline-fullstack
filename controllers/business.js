const { isAuthorized } = require("../middleware/auth");
const Business = require("../models/Business");

//Middleware to get business by id
exports.getBusinessById = async (req, res, next, id) => {
  try {
    const business = await Business.findById(id);
    req.business = business;
    next();
  } catch (error) {
    res.status(400).json({ error: "Cannot find the Business associated with Id" });
    return;
  }
};

//add user to the business
exports.addBusinessStaff = async (req, res) => {
  try {
    const business = req.business;
    const { user_id } = req.params;

    if(!isAuthorized(business.manager, req.user.id)) {
      throw new Error('Unauthorizeed User');
    }

    // console.log(business.staffs.findIndex(user_id))
    const isPresent = business.staffs.includes(user_id.toString());

    if(isPresent) {
      return res.status(302).json({ msg: 'Already added'});
    }

    business.staffs.unshift(user_id);
    await business.save()
    return res.status(200).json({ success: "Client has been added succesfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server Error" });
    return;
  }
}

//remove staff from the organization
exports.removeBusinessStaff = async (req, res) => {
  try {
    const business = req.business;
    const { user_id } = req.params;

    if(!isAuthorized(business.manager, req.user.id)) {
      throw new Error('Unauthorizeed User');
    }

    business.staffs = business.staffs.filter(sId => sId.toString() !== user_id.toString());
    await business.save()
    return res.status(200).json({ success: "Client has been removed succesfully"});
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
    return;
  }
}

//Get all the business Organization
exports.getBusinessOrg = async (req, res) => {
  try {
    const businessOrg = await Business.find({ manager: req.user.id.toString()});

    if(businessOrg.length === 0) {
      throw new Error("No business org found");
    }

    return res.status(200).json(businessOrg);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'Internal Server Error'});
    return;
  }
};

//create new Organizaiton
exports.createBusiness = async (req, res) => {
  try {
    req.body.manager = req.user.id;
    //populated by getPostById middleware
    //req object is added new property post
    //post has value pointed by post id
    const business = new Business(req.body);

    await business.save();

    return res.status(200).json({ data: business});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error saving business into database." });
    return;
  }
};

//update and return an existing Organization
exports.updateBusiness = async (req, res) => {
  try {
    const { name, location } = req.body;
    const { manager } = req.business;
    
    if (JSON.stringify(manager) !== JSON.stringify(req.user.id)) {
        throw new Error("Not Sufficient Permission");
    }

    req.business.name = name;
    req.business.location = location;

    await req.business.save();
    return res.status(200).json(req.business);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'Cannot update Organization.'});
    return;
  }
};

//delete an existing Organization
exports.deleteBusiness = async (req, res) => {
  try {
    const { manager } = req.business;
    
    if (JSON.stringify(manager) !== JSON.stringify(req.user.id)) {
        throw new Error("Not Sufficient Permission");
    }

    const deletedBusiness = await Business.findByIdAndDelete({ _id: req.business._id });
    return res.status(200).json({ deletedBusiness });
  } catch (error) {
    res.status(400).json({ error: error.message ? error.message : 'Cannot delete Business Organization.'});
    return;
  }
};
