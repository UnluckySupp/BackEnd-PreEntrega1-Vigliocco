export const resProductDTO = product => {
  return {
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    _id: product._id,
  };
};

export const resAllProductsDTO = ({ docs, ...resPaginate }) => {
  let newDocs = [];
  for (let i in docs) {
    const newProduct = {
      title: docs[i].title,
      description: docs[i].description,
      price: docs[i].price,
      stock: docs[i].stock,
    };
    newDocs.push(newProduct);
  }
  return { docs: newDocs, ...resPaginate };
};
