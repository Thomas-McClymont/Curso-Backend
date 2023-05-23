class ProductManager {
    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products;
    }
    generateId() {
        return Date.now().toString();
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const currentProduct = this.products.find(product => product.code === code);
        if (currentProduct) {
        throw new Error('El código ya existe.');
        }
        const id = this.generateId();
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
    this.products.push(product);
    return id;
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
        throw new Error('No se encontró el producto.');
        }
        return product;
    }
    updateProduct(id, field, value) {
        const product = this.getProductById(id);
        if (field !== 'id') {
            product[field] = value;
        }
        return product;
    }
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products.splice(index, 1);
    }
    generateId() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
        return id;
    }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());

const productId = productManager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
);
console.log('ID del producto agregado:', productId);
console.log(productManager.getProducts());

const productById = productManager.getProductById(productId);
console.log('Producto por ID:', productById);

productManager.updateProduct(productId, 'price', 300);
console.log('Producto actualizado:', productManager.getProductById(productId));

productManager.deleteProduct(productId);
console.log('Productos después de eliminar:', productManager.getProducts());