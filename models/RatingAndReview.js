const mongoose=require("mongoose");
const  ratingAndReview=new mongoose.Schema({
   productid:{
    type:Number,
    required:true,
   },
   rating:{
      type:Number,
      required:true,
     },
   review:{
    type:String,
   },
   name:{
      type:String,
      required:true,
     },
     
     reviewTitle:{
    type:String,
   },
   email:{
      type:String,
      required:true,
     },
   vedioUrls:[
      {
        type:String,
   }  
   ],
    imageUrls:[
      {
     type:String,
    }
   ],

   createdAt: {
      type:Date,
      default:Date.now
  },

});

module.exports=mongoose.model("RatingAndReview",ratingAndReview)