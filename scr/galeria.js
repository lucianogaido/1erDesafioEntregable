//  GENERADOR DE CARDS EN MODAL CARRITO

function cardsEnCarrito(productosCarrito) {
    let acumuladorProductosCarrito = '';
    productosCarrito.forEach((elemento) => {
        acumuladorProductosCarrito += `
        <div class="cart-items">
            <div class="cart-row">
                <div class="cart-item cart-column">
                <img src="${(elemento.img === "")? '../assets/Nuna.png' : elemento.img}" alt="Imagen producto ${elemento.titulo}" width="100" height="100">
                    <span class="cart-item-title">${elemento.titulo}</span>
                </div>
                <span class="cart-price cart-column">$${elemento.precio}</span>
                <div class="cart-quantity cart-column">
                    <button type="button" onclick="restarUno(${elemento.id})" class="badge btn btn-warning ms-1 rounded-pill">${(elemento.cantidad > 1) ? '-' : '<i class="fa-solid fa-trash-can"></i>'}</button>
                    <input class="cart-quantity-input" id="cant-${elemento.id}" value= "${elemento.cantidad}">
                    <button type="button" onclick="agregarUno(${elemento.id})" class="badge btn btn-warning ms-1 rounded-pill">+</button>
                    <button onclick="removerUnProducto(${elemento.id})" class="btn btn-danger" type="button"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    `
    });
    mostrarProductosCarrito(acumuladorProductosCarrito);
};

function mostrarProductosCarrito(cards) {
    document.getElementById("modalCarrito").innerHTML = cards;
}

cardsEnCarrito(carrito);
