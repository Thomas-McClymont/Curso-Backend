import {promises as fs} from "fs";

export default class ProductManager{
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
        this.newId = 1
    }
    //AGREGAR PRODUCTO
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            const productExist = this.products.find(
                (product) => product.code === code
            );
            if (productExist) {
                console.log(`Producto "${title}" tiene un error, el codigo "${code}" es el mismo del producto "${productExist.title}".`);
                return;
            }
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log(`Todos los campos son obligatorios en el producto "${title}" que estas intentando ingresar`);
                return;
            } 
            let newProduct ={
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this.newId++,
            };
            this.products.push (newProduct);
            
            await fs.writeFile(this.patch, JSON.stringify(this.products));
        } catch (error) {
            console.log(error)
        }
    }
    //LEER 
    readProducts = async () => {
        try {
            let response = await fs.readFile(this.patch, "utf-8");
            return JSON.parse(response);
        } catch (error) {
            console.log(error);
        }
        
    }
    //OBTENER PRODUCTO
    getProducts = async () => {
        try {
            let response2 = await this.readProducts();
            return console.log(response2);
        } catch (error) {
            console.log(error);
        }
        
    }
    //OBTENER POR ID
    getProductsById = async (id) => {
        try{
            let response3 = await this.readProducts();
            let productFilter = response3.find((product) => product.id === id);
            console.log(productFilter);
        } catch (error) {
            console.log(error);
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
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        try {
            let toUpdateProduct = await this.readProducts();
            let productUpdate = toUpdateProduct.findIndex(
                (product) => product.id === id
            );
            if (productUpdate.length > 0) {
                return;
            }
            let codeExists = toUpdateProduct.some((product) => product.code === code);
            if (codeExists) {
                return console.log('El "code" ingresado esta duplicado');
            }
            if (
                !id ||
                !title ||
                !description ||
                !price ||
                !thumbnail ||
                !code ||
                !stock
            ) {
            console.log('No se puede actualizar');
            return;
            }
            if (productUpdate !== -1) {
                toUpdateProduct[productUpdate].title = title;
                toUpdateProduct[productUpdate].description = description;
                toUpdateProduct[productUpdate].price = price;
                toUpdateProduct[productUpdate].thumbnail = thumbnail;
                toUpdateProduct[productUpdate].code = code;
                toUpdateProduct[productUpdate].stock = stock;
                await fs.writeFile(this.path, JSON.stringify(toUpdateProduct));
                console.log(`Producto actualizado`);
            } else {
                console.log(
                `No existe ese producto`
                );
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
}

const products = new ProductManager()

products.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
products.getProductsById(1)
products.deleteProduct(2)
products.updateProduct(3)