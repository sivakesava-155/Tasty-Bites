const { addVegProduct,getVegProducts,getProductsByCategory,updateProduct,deleteProduct } = require("./Productcontroller");

const { protect, isAdmin } = require("../middlewares/auth.middleware");
const productRouter = require("express").Router();
const upload = require("../middlewares/uploadMiddleware");

	// Post Calls to Save Products in Database
	productRouter.post("/saveProduct",protect,isAdmin,upload.single("image"), addVegProduct);
    productRouter.get("/getProducts",protect, getVegProducts);
    productRouter.get("/category/:category", getProductsByCategory);
    productRouter.put("/updateProduct/:id",protect,isAdmin,upload.single("image"),updateProduct);
    productRouter.delete("/deleteProduct/:id",protect,isAdmin,deleteProduct);
	module.exports = productRouter;














   // const =require("./src/OrderController")
	// productRouter.post("/saveAllProducts",protect,isAdmin, addAllVegProducts);
    
    
    // productRouter.post("/saveNonVeg",protect,isAdmin, addNonVegProduct);
	// productRouter.post("/adduser",protect,isAdmin, addUser);
	// productRouter.post("/saveAllNonVeg",protect,isAdmin, addAllNonVegProducts);

	// // Get Calls to Get the Data from DataBase
	// productRouter.get("/getVeg",protect, getVegProducts);
	// productRouter.get("/getNonVeg",protect, getNonVegProducts);
    // productRouter.get("/getusers",protect,getUsers)
	// Routes for Orders
// router.post("/create", OrderController.addOrder); // Create an order
// router.get("/:orderId", OrderController.getOrder); // Get an order by ID
// router.get("/user/:userId", OrderController.getUserOrders); // Get all orders for a user
