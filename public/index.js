const socket = io();
const productsList = document.getElementById("container");

socket.on("resProduct", (data) => {
    console.log(data);
    productsList.innerHTML = "";
    data.products.forEach(product => {
        const card = document.createElement("div");
        card.innerHTML = `
        <p>-------------------------</p>
        <h2>Product:${product.title}</h2>
        <p>Price:${product.price}</p>
        <p>Description:${product.description}</p>
        <p>Stock:${product.stock}</p>
        `;
        productsList.appendChild(card);
    })
});