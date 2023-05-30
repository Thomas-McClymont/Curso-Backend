import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express()
app.use(express.urlencoded({ extended: true}))

const products = new ProductManager()
const readProducts = products.readProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(await productLimit)
})

app.get("/products/:pid", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById);
    console.log(id);
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Express local host ${server.address().port}`)
})
server.on("error", (error) => console.log(`Server error ${error}`))
