const carrito = validarStorageCarrito();

function validarStorageCarrito() {
    if (localStorage.getItem("carrito") != null) {
        const storageProductos = JSON.parse(localStorage.getItem("carrito"));
        return storageProductos;
    } else {
        return [];
    }
}

const totalCarrito = validarStorageTotal();

function validarStorageTotal() {
    if (localStorage.getItem("totalCarrito") != null) {
        const storageTotal = JSON.parse(localStorage.getItem("totalCarrito"));
        document.getElementById("total-precio").innerHTML = `$${storageTotal}`;
        return storageTotal;
    } else {
        return [];
    }
};
const cantidadCarrito = validarStorageCantidad();

function validarStorageCantidad() {
    if (localStorage.getItem("cantidadCarrito") != null) {
        const storageCantidad = JSON.parse(localStorage.getItem("cantidadCarrito"));
        document.getElementById("cantidad-prod").innerHTML = storageCantidad;
        return storageCantidad;
    } else {
        return [];
    }
};

//                                          FUNCIONES                                     
//  remover del carrito

function removerUnProducto(idProducto) {
    const productoARemover = carrito.find(producto => producto.id === idProducto);
    let indexDelProducto = carrito.indexOf(productoARemover);
    carrito.splice((indexDelProducto), 1);
    cardsEnCarrito(carrito);
    totalDelCarrito();
    cantProdCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    //    TOASTIFY
    Toastify({
        text: `Eliminaste ${productoARemover.titulo}`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}
    }).showToast();
};

//             FUNCION AUMENTAR CANTIDAD EN MODAL CARRITO

function agregarUno(idProducto) {
    const producto = carrito.find(producto => producto.id === idProducto);
    const productoAgregado = carrito.findIndex(producto => producto.id === idProducto);
    if (producto.stock > carrito[productoAgregado].cantidad){
    carrito[productoAgregado].cantidad++;
    cardsEnCarrito(carrito);
    totalDelCarrito();
    cantProdCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    } else{
        swal({
        title: `No tenemos Stock suficiente de ${producto.titulo}`,
        text: "Intenta con una cantidad menor",
        icon: 'error',
        button: "Continuar comprando",
    });}
};

//             FUNCION RESTAR CANTIDAD EN MODAL CARRITO


function restarUno(idProducto) {
    const producto = carrito.find(producto => producto.id === idProducto);
    let productoAgregado = carrito.indexOf(producto);
    if (carrito[productoAgregado].cantidad > 1) {
        carrito[productoAgregado].cantidad--;
        cardsEnCarrito(carrito);
        totalDelCarrito();
        cantProdCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
    carrito.splice((productoAgregado), 1);
    cardsEnCarrito(carrito);
    totalDelCarrito();
    cantProdCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
        //    TOASTIFY
        Toastify({
            text: `Eliminaste ${producto.titulo}`,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();
    };
};
//             FUNCION TOTAL CARRITO


function totalDelCarrito() {
    const precioTotalCarrito = carrito.reduce((acc, productoAgregado) => (acc + (productoAgregado.precio * productoAgregado.cantidad)), 0);
    document.getElementById("total-precio").innerHTML = `$${precioTotalCarrito}`;
    localStorage.setItem("totalCarrito", JSON.stringify(precioTotalCarrito));
};

//             FUNCION TOTAL CANTIDAD CARRITO


function cantProdCarrito() {
    const cantidadTotalCarrito = carrito.reduce((acc, productoAgregado) => (acc + Number(productoAgregado.cantidad)), 0);
    document.getElementById("cantidad-prod").innerHTML = cantidadTotalCarrito;
    localStorage.setItem("cantidadCarrito", JSON.stringify(cantidadTotalCarrito));
}

// FUNCION VACIAR CARRITO 

function vaciarCarrito() {
    carrito.splice(0, carrito.length);
    cardsEnCarrito(carrito);
    totalDelCarrito();
    cantProdCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('totalCarrito', JSON.stringify(carrito));
    localStorage.setItem('cantidadCarrito', JSON.stringify(carrito));
};
const vaciar = document.getElementById("vaciarCarrito");
vaciar.addEventListener("click", vaciarCarrito);

//      BUSCADOR 

function buscador() {
    const nombreProductoBuscado = document.getElementById('productoBuscado').value.toUpperCase().trim();
    const productosEncontrados = productos.filter((producto) => {
        return producto.titulo.toUpperCase().match(nombreProductoBuscado);
    });
        document.getElementById("cards").innerHTML = `<div class="col-lg-12"><h2>Resultados que coinciden con "${nombreProductoBuscado}"</h2></div>`;
        generarCards(productosEncontrados);
    
};