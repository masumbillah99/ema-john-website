import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const loadedProducts = await fetch("products.json");
  const products = await loadedProducts.json();

  // if cart data is in database, you have to use async await
  const storedCart = getShoppingCart();
  const savedCart = [];

  for (const id in storedCart) {
    const addedProduct = products.find((product) => product.id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  // if you need to return / send two things: wrap in array
  // return [products, savedCart];
  // return {products, savedCart};

  return savedCart;
};

export default cartProductsLoader;
