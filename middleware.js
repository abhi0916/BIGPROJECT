const Listing = require("./models/listing");
// const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  
    if(!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
      return  res.redirect("/login");
    }
    next();

    
};
module.exports.saveRedirectUrl = (req, res , next) => {
  if(req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let {id} = req.params;
  let listing = Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)) {
   req.flash("error", "you dont have permission to edit");
  return res.redirect(`/listings/${id}`);
  }
 await Listing.findByIdAndUpdate(id, {...req.body.listing});
 req.flash("success", "listing updated"); 
 res.redirect(`/listings/${id}`);

 next();
};

module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
   
  if (error) {
      throw new ExpressError(400 , error);
  }else {
      next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let {id, reviewId} = req.params;
  let review = Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)) {
   req.flash("error", "you dont have permission to delete");
  return res.redirect(`/listings/${id}`);
  }
//  await Listing.findByIdAndUpdate(id, {...req.body.listing});
//  req.flash("success", "listing updated"); 
//  res.redirect(`/listings/${id}`);

 next();
};

