

	const mongoose = require("mongoose"); 
	const ProductSchema = require("./ProductSchema");
	
	const Product = mongoose.model("products", ProductSchema);
	

	// Saving Single Veg Product
	const addNewVegProduct = (newProduct) => {
		new Product(newProduct).save();
		
	}

	

	 const fetchAllVegProducts = () => {
		return Product.find();
	}

	const fetchProductsByCategory = (category) => {
		return Product.find({
			category: { $regex: `^${category}$`, $options: "i" }
		});
	}
// Update Product
const updateVegProduct = async (id, updatedData) => {
	return await Product.findByIdAndUpdate(
	  id,
	  updatedData,
	  { new: true }
	);
  };
  
  // Delete Product
  const deleteVegProduct = async (id) => {
	return await Product.findByIdAndDelete(id);
  };
  

	module.exports = { 
		addNewVegProduct, 
		updateVegProduct,
		fetchAllVegProducts, 
		fetchProductsByCategory,
		deleteVegProduct,
		};



	/*
	// Saving Multiple Veg Products
	const addNewVegProducts = (newProducts) => {
		vegProduct.insertMany(newProducts);
	}*/