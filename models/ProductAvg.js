const mongoose=require("mongoose");
const  productAvgRating=new mongoose.Schema({
    productid:{
        type:Number,
        required:true,
       },
    averageRating:{
          type:Number,
          required:true,
         },
         ratingOne:{
            type:Number,
            default: 0,
           },
        ratingTwo:{
            type:Number,
            default: 0,
           },
        ratingThree:{
            type:Number,
            default: 0,
           },
        ratingFour:{
            type:Number,
            default: 0,
           },    
        ratingFive:{
            type:Number,
            default: 0,
           },        
});

module.exports=mongoose.model("ProductAverageRating",productAvgRating)