const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,  } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
 

const validateListing = (req, res, next) => {
   let {error} = listingSchema.validate(req.body);
    
   if (error) {
       throw new ExpressError(400 , error);
   }else {
       next();
   }
};

router.route("/")
    .get(wrapAsync(listingcontroller.index))
    .post(isLoggedIn, upload.single("listing[image]"), (req, res, next) => {
        console.log(req.body); 
        console.log(req.file); 
        next();
    }, wrapAsync(listingcontroller.createListing));


    // new route
    router.get("/new", isLoggedIn, listingcontroller.renderNewform);


   router.route("/:id")
   .get(
    wrapAsync(listingcontroller.showListing))
    .put( isLoggedIn,isOwner,upload.single("listing[image]"),
      wrapAsync(listingcontroller.updateListing)
    )
    .delete( isLoggedIn, wrapAsync(listingcontroller.deleteListing));

  


 // edit route
   router.get("/:id/edit", isLoggedIn, wrapAsync(listingcontroller.renderEditform));

    

     
   module.exports = router;
   