
const RatingAndReview=require("../models/RatingAndReview");
const ProductAvgRating=require("../models/ProductAvg")
const uploadOnCloudinary=require("../utils/cloudinary")

const mongoose=require("mongoose")
//create rating and review
exports.createRating=async (req,res)=>{
 try {
    //fetch data

    const files=req.files;
      console.log("req",req.files)

    const {reviewTitle, review, name, email ,rating,productid} = req.body; // Adjust these field names as needed
    
    if(!name && !email && !rating ){
        return res.status(400).json({
            success:false,
            message:"name , email  ,rating all are required",
        })
    }

    if(!productid){
        return res.status(400).json({
            success:false,
            message:"productid is  required",
        })
    }

    let Images=[]
    let Videos = [];
    if(files){
        for(let i=0;i<files.length;i++){
      const thumnailImage= await uploadOnCloudinary( files[i].path);
        // Check if the uploaded file is a video or an image
        if (files[i].mimetype.startsWith('video/')) {
            // Store video URLs in the Videos array
            Videos.push(thumnailImage);
        } else if (files[i].mimetype.startsWith('image/')) {
            // Store image URLs in the Images array
            Images.push(thumnailImage);
        }
      }
    }

   console.log("images",Images)
      const ratingReview= await RatingAndReview.create({
        productid,
        rating,
         name,
         review,
         reviewTitle,
         email,
         imageUrls:Images,
         vedioUrls: Videos,
        });

     let avgRating=await ProductAvgRating.findOne({productid: productid})
      if(avgRating){
        avgRating.averageRating += parseInt(rating);
       
        if(rating==1){
               avgRating.ratingOne++;
        }
        else if(rating==2){
            avgRating.ratingTwo++;
        }
        else if(rating==3){
            avgRating.ratingThree++;
        }
        else if(rating==4){
            avgRating.ratingFour++;
        }
        else {
            avgRating.ratingFive++;
        }
        avgRating.save();
            
        
      }
      else{
        const findRating=rating==1?{ratingOne:1}:rating==2?{ratingTwo:1}:rating==3?{ratingThree:1}:rating==4?{ratingFour:1}:{ratingFive:1}
           console.log("findRating",findRating);
        avgRating=  await ProductAvgRating.create({
            productid,
            averageRating:rating,
            ...findRating,
      })
       
                 
      }
      console.log("ratingReview",ratingReview)
   return res.status(200).json({
    success:true,
    message:'Rating and Review created Sucessfully',
     data:ratingReview,
    avgRating,
   })

 } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'something went in creating rating and review'
    })
    
 }
  
}
//getAverageRating for a course
exports.getAverageRating=async (req,res)=>{
        try { 
            console.log("inside average rating")
           const {productid}=req.body;
           console.log("productid",productid)

           if(!productid){
            return res.status(400).json({
                success:false,
                message:"productid is  required",
            })
        }

          
          const totalReview = await RatingAndReview.countDocuments({ productid });
          
          if (totalReview === 0) {
            // Avoid division by zero
            return res.status(200).json({
              success: false,
              data:null,
              avgRating: 0, 
              message: "your be the first to review",
            });
          }

        const totalRating= await ProductAvgRating.findOne({productid:productid});
           
          if (!totalRating) {
           return res.status(404).json({
             success: false,
             data:null,
             message: "Product rating not found.",
           });
         }

        
         const avgRating = (totalRating.averageRating / totalReview).toFixed(1);
         res.status(200).json({
            success:true,
            data:totalRating,
            avgRating:avgRating ,
            totalReview : totalReview ,

         })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'something went wrong in getting avg rating',
                error:error.message,
            })
            
        }
    }


//get all rating and review
exports.getAllRating=async (req,res)=>{
    try { 
       const {productid}=req.body;
       console.log("productid",productid)
       if(!productid){
        return res.status(400).json({
            success:false,
            message:"productid is  required",
        })
    }
       const allRatingAndReview= await RatingAndReview.find({productid:productid}).sort({createdAt:-1});
       console.log("all rating",allRatingAndReview)

     res.status(200).json({
        success:true,
        data:allRatingAndReview
     })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong in getting all review and rating',
            error:error.message,
        })
        
    }
}

