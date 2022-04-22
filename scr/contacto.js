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

function validarInput(event){
    const valorInput = event.target.value;
    if(valorInput =="") event.target.style.border = "2px solid red";
    if ((event.target.type === "email") && (valorInput.includes("@"))) event.target.style.border = "2px solid green";
    };

function formulario(){
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const consulta = document.getElementById("consulta").value;

    if((nombre != "") && ((email !="") && (email.includes("@")) )&& (consulta !="")){
    swal({
        title: `Hemos registrado tu consulta`,
        icon: "success",
        buttons: {
            cancel: true
        }
    });
    location.reload();
} else{
    swal({
        title: `Tienes que completar todos los campos correctamente!`,
        icon: "error",
        buttons: {
            cancel: true
        }
    });
}
};