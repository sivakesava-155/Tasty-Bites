const mongoose = require("mongoose");

		const ProductSchema = new mongoose.Schema({
			  id : {
				type: Number,  
				autoIncrement: true
			     },
			  name: String,
			  price: Number,
			 
			//   image: String,
			  ratings: Number,
			  image: {
				data: Buffer,
				contentType: String
			  },
			  
			  category: String,
			}, 
		);

	module.exports = ProductSchema;
	