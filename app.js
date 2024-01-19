import ProductManager from "./productManager.js";
import express from "express";
import fs from "fs";

const PORT = 8080;
const productManager = new ProductManager("products.json");
//inicializar la app con express
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  //probar leer el archivo
  try {
    let products = productManager.getProduct();
    console.log("los productos son:", products);

    //let products= await fs.promises.readFile("./products.json","utf-8")
    //let parsedProducts = JSON.parse(products);
    const limit = parseInt(req.query.limit);
    //en caso que el limite del req.query no sea un numero, se devuelve el JSON del producto completo
    if (!isNaN(limit) && limit > 0) {
      let limitProducts = products.slice(0, limit);
      if (limitProducts) {
        res.json(limitProducts);
      }
    } else {
      res.json(products);
    }
  } catch (error) {
    res.send("error al obtener los productos");
  }
});

//obtener los productos segun su id desde prductManager

app.get("/products/:id", (req, res) => {
  try {
    /*let products = await fs.promises.readFile("./products.json", "utf-8");
    let parsedProducts = JSON.parse(products);*/
    const id = parseInt(req.params.id);
    let product = productManager.getProductById(id); //parsedProducts.find((u) => u.id === id);
    if (!product) {
      return res.send("error: the product to this id dont exist");
    } else {
      return res.send(product);
    }
  } catch (error) {
    return res.send(error);
  }
});
/* let id= parseInt (req.params.id);
    let product= productManager.getProductById(id);
    res.json(product);
});*/

app.listen(PORT, () => console.log(`server runing o post ${PORT}`));
