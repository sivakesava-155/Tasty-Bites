const mongoose = require("mongoose");
const { addNewVegProduct, 
	addNewVegProducts,
	fetchAllVegProducts,
	fetchProductsByCategory,
	updateVegProduct
 } = require("./ProductService");
 const ProductSchema = require("./ProductSchema");


 // ✅ Create model from schema
 const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
 
 const addVegProduct = async (req, res) => {
   try {
	 const { name, price, category } = req.body;
 
	 const product = await Product.create({
	   name,
	   price,
	   category,
	   image: req.file
		 ? {
			 data: req.file.buffer,
			 contentType: req.file.mimetype
		   }
		 : null
	 });
 
	 res.status(201).json(product);
   } catch (err) {
	 console.error("ERROR:", err);
	 res.status(500).json({ message: err.message });
   }
 };
	
	  // Adding Multiple Veg Products
	  addAllVegProducts = (req, res) => {
		addNewVegProducts(req.body);
		res.send("All Products Saved SuccessFully");
	  }
	
	  const getVegProducts = async (req, res) => {
		try {
		  const veg = await fetchAllVegProducts();
	  
		  const modifiedProducts = veg.map((product) => ({
			_id: product._id,
			name: product.name,
			price: product.price,
			category: product.category,
	  
			image: product.image?.data
			  ? `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`
			  : null
		  }));
	  
		  res.json(modifiedProducts);
	  
		} catch (err) {
		  res.status(500).json({ message: "Server Error" });
		}
	  };

	  const getProductsByCategory = async (req, res) => {
		try {
		  const { category } = req.params;
		  const products = await fetchProductsByCategory(category);

		  const modifiedProducts = products.map((product) => ({
			_id: product._id,
			name: product.name,
			price: product.price,
			category: product.category,
			image: product.image?.data
			  ? `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`
			  : null
		  }));

		  res.json(modifiedProducts);
		} catch (err) {
		  console.error("Error fetching products by category:", err);
		  res.status(500).json({ message: "Server Error" });
		}
	  };

	 const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;
    const { name, price, category } = req.body;

    const updateData = {
      name,
      price,
      category
    };

    // Update image if uploaded
    if (req.file) {

      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedProduct =
      await updateVegProduct(id, updateData);

    res.json(updatedProduct);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Update Failed"
    });
  }
};
	   const deleteProduct = async (req, res) => {

		try {
	  
		  const { id } = req.params;
	  
		  await Product.findByIdAndDelete(id);
	  
		  res.json({
			message: "Product deleted successfully"
		  });
	  
		} catch (err) {
	  
		  console.log(err);
	  
		  res.status(500).json({
			message: "Delete failed"
		  });
		}
	  };


	 module.exports = { addVegProduct, 
		            //   addAllVegProducts, 
	                  getVegProducts, 
					  getProductsByCategory,
					  updateProduct,
					  deleteProduct,
	   };


