import db from "../config/db.js";

//Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: products.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//Create a product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }
  try {
    const newProduct = await db.query(
      "INSERT INTO products(name, image, price) VALUES($1, $2, $3) RETURNING *",
      [name, image, price]
    );
    res.status(201).json({ success: true, data: newProduct.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Get one product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.query("SELECT * FROM products WHERE id=$1", [id]);
    res.status(200).json({ success: true, data: product.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      success: false,
      message: "Please enter a valid id",
    });
  }
  try {
    const deletedProduct = await db.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id],
    );

    if (deletedProduct.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

//   if(!name || !price ||!image){
//     res.status(404).json({
//         success:false,
//         message:"All the fields are required"
//     })
//   }

  try {
    const updatedProduct = await db.query(
      "UPDATE products SET name=$1, image=$2, price=$3  WHERE id=$4 RETURNING *",
      [name, image, price, id],
    );  

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updatedProduct.rows[0] });
  } catch (error) { 
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
