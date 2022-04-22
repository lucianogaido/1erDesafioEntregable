let productos = [];

fetch("/data.json")
    .then((response) => response.json())
    .then((data) => productos = data.mermeladas)
/*************************************************************************************************************************************                                                           DOM                       ************************************************************************************************************************************/

fetch("/data.json")
    .then((response) => response.json())
    .then((data) => generarCards(data.mermeladas))

// GENERADOR DE CARDS 


function generarCards(productosAMostrar) {
    const divCards = document.getElementById('cards')
    productosAMostrar.forEach(elemento => {
        divCards.innerHTML += `
    <div class="col mb-4">
            <div class="card ">
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
                ${(elemento.stock > 0) ? 'Disponible' : 'Sin Stock'}
            </div>
                <img src="${(elemento.img === "")? '../assets/Nuna.png' : elemento.img}" class="card-img-top" alt="Mermelada de Arandanos">
                <div class="card-body">
                <h5 class="card-titulo">${elemento.titulo}</h5>
                <p><span>Precio: $${elemento.precio}</span></p>
                <input value= "1" min="1" class="cart-quantity-input" id="cantidad-${elemento.id}" type="number" name="cant" id="cant">
                <button type="button" class="boton btn btn-warning"
                ${(elemento.stock == 0) && "disabled"}
                onclick="agregarAlCarrito(${elemento.id})" >
                Añadir al Carrito
                </button>
                </div>
                </div>
                </div>
                `
    });
};

//  GENERADOR DE CARDS EN MODAL CARRITO

function cardsEnCarrito(productosCarrito) {
    let acumuladorProductosCarrito = '';
    productosCarrito.forEach((elemento) => {
        acumuladorProductosCarrito += `
        <div class="cart-items">
        <button onclick="removerUnProducto(${elemento.id})" type="button" class="close "  aria-label="Close">
        <i id="trashIcon" class="fa-solid fa-trash-can"></i>
        </button>
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

//*************************************************************************************************************************************                                                 F U N C I O N E S *************************************************************************************************************************************

const agregarAlCarrito = (idProducto) => {

    const valorDeCantidad = Number(document.getElementById(`cantidad-${idProducto}`).value);
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    let productoExistente = carrito.find(producto => producto.id === idProducto);
    if ((productoAgregado.stock > valorDeCantidad) && (productoExistente === undefined)) {
        productoAgregado.cantidad = valorDeCantidad;
        carrito.push(productoAgregado);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        productoAgregado.stock - (Number(valorDeCantidad));
        cantProdCarrito();
        cardsEnCarrito(carrito);
        totalDelCarrito();
        // SWEET ALERT

        swal({
            title: `Agregaste ${productoAgregado.titulo} al Carrito!`,
            icon: "success",
            button: "Continuar comprando",
        });
    } else if ((productoAgregado.stock > valorDeCantidad) && (productoExistente = !undefined)) {
        const indiceProducto = carrito.findIndex(producto => producto.id === idProducto);
        let nuevaCantidad = (Number(carrito[indiceProducto].cantidad += valorDeCantidad));
        if (productoAgregado.stock > nuevaCantidad) {
            productoExistente.cantidad += nuevaCantidad;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            productoAgregado.stock - (Number(valorDeCantidad));
            cantProdCarrito();
            cardsEnCarrito(carrito);
            totalDelCarrito();
            // SWEET ALERT
            swal({
                title: `Agregaste ${productoAgregado.titulo} al Carrito!`,
                icon: "success",
                button: "Continuar comprando",
            });
        } else {
            swal({
                title: `No tenemos Stock suficiente de ${productoAgregado.titulo}`,
                text: "Intenta con una cantidad menor",
                icon: 'error',
                button: "Continuar comprando",
            });

        }
    } else {
        swal({
            title: `No tenemos Stock suficiente de ${productoAgregado.titulo}`,
            text: "Intenta con una cantidad menor",
            icon: 'error',
            button: "Continuar comprando",
        });
    };
};
