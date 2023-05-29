import {promises as fs} from "fs";

class ProductManager{
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
        this.newId = 1
    }
    //AGREGAR PRODUCTO
    addProduct = async(title, description, price, thumbnail, code, stock) => {
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.newId++
        }
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }
    //LEER 
    readProducts = async () => {
        let response = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(response);
    }
    //OBTENER PRODUCTO
    getProducts = async () => {
        let response2 = await this.readProducts();
        return console.log(response2);
    }
    //OBTENER POR ID
    getProductsById = async (id) => {
        let response3 = await this.readProducts();
        if(!response3.find(product => product.id === id)){
            console.log("No se encontro el producto")
        } else {
            console.log(response3.find(product => product.id === id));
        }
    }
    //ELIMINAR PRODUCTO
    deleteProduct = async (id) => {
        let response3 = await this.readProducts();
        let productFilter = response3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto eliminado");
    }
    //ACTUALIZAR PRODUCTO
    updateProduct = async ({id, ...product}) => {
        await this.deleteProduct(id);
        let oldProduct = await this.readProducts()
        let modifiedProducts = [{id, ...product}, ...oldProduct]
        await fs.writeFile(this.patch, JSON.stringify(modifiedProducts));
    }
}

const productos = new ProductManager()

productos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
productos.getProductsById()
productos.deleteProduct()
//productos.updateProduct()