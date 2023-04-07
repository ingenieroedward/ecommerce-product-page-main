function mostrar(id) {
    let img = document.getElementById('primary-img');
    let src = "images/image-product-" + id + ".jpg"

    img.src = src;
    document.querySelectorAll('.img').forEach(img => img.setAttribute('class', 'img'));
    document.getElementById(id).setAttribute('class', 'img select');
}

function add() {
    var cant = document.getElementById('cant');
    cant.textContent = parseInt(cant.textContent) + 1;
}

function sub() {
    var cant = document.getElementById('cant');
    if (parseInt(cant.textContent) > 0) {
        cant.textContent = parseInt(cant.textContent) - 1;
    } else {
        alert('No puedes restar más');
    }
}
var objetcs = [];
function add_to_cart() {
    var cant = document.getElementById('cant');
    if (parseInt(cant.textContent) > 0) {
        //agregar articulos a comprar
        let product = {
            img: document.getElementById('1').src,
            name: document.getElementById('name-product').textContent,
            price: parseFloat(document.getElementById('price-product').textContent),
            cant_p: parseInt(document.getElementById('cant').textContent)
        };
        if (objetcs.length > 0) {
            var existe = false;
            for (let index = 0; index < objetcs.length; index++) {
                if (objetcs[index].name === product.name) {
                    objetcs[index].cant_p = objetcs[index].cant_p + product.cant_p;
                    existe = true;
                    break;
                }
            }
            if (existe === false) {
                objetcs.push(product);
            }
        } else {
            objetcs.push(product);
        }

    }

}
//funcion mostar notficacion

const button = document.getElementById('cart')
const toast = document.getElementById('toasts')

const messages = [

    ' Agregado al carrito'
]

const types = [
    'success'
]

button.addEventListener('click', () => {
    createToast();
    add_to_cart();
    limpiar();
})

function createToast(message = null, type = null) {
    let properties
    const notif = document.createElement('div')
    const notifIcon = document.createElement('span')
    const notificationType = 'success';

    properties = setProperties('success');

    notif.classList.add(properties[3]);
    notif.classList.add(notificationType)

    notifIcon.classList.add(properties[0])
    notifIcon.classList.add(properties[1])

    notif.innerText = properties[2];

    toast.appendChild(notif)
    notif.append(notifIcon)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function setProperties(notificationType) {
    let propertyList

    switch (notificationType) {
        case 'success':
            if (parseInt(document.getElementById('cant').textContent) > 0) {
                propertyList = ['fas', 'fa-check-circle', ' Agregado al carrito', 'toast'];
            } else {
                propertyList = ['fas', 'fa-times-circle', ' Seleccione la cantidad', 'toast2'];
            }

            break
    }

    return propertyList;
}

///Carrito 
function cart() {
    let cart = document.getElementById('cart-mostrar');
    let div_list = document.getElementById('div-list');
    if (cart.getAttribute('name') === 'mostrar') {
        cart.setAttribute('name', 'ocultar');
        if (objetcs.length == 0) {
            div_list.innerHTML = `
            <ul id="listCart">
                <h3>Cart</h3>
                <hr>
                <li class="empty">Your cart is empty</li>
            </ul>
            `;
        } else {
            div_list.innerHTML = `
            <ul id="listCart">
                <h3>Cart</h3>
                <hr>
            </ul>
            `;
            let list = document.getElementById('listCart');
            objetcs.forEach(product => {
                let total = product.price * product.cant_p;
                var cont = 0;
                var id = cont + 1;
                cont = id;
                list.innerHTML += `
            <li class="product-cart">
                <img class="img-p" src=${product.img} alt="">
                <div>
                <p>${product.name}</p>
                <p>$${product.price}.00 x ${product.cant_p} <b>$${total}.00</b></p>
                </div>
                <img id=${id} onclick="delete_list(id)" class="delete" src="images/icon-delete.svg" alt="">
            </li>
              `
            });
            list.innerHTML += `<button onclick="checkout()">Checkout</button>`;
        }
    } else {
        cart.setAttribute('name', 'mostrar');
        div_list.innerHTML = ``;
    }
}
//eliminar
function delete_list(id) {
    let op = confirm('¿Desea eliminar este producto de su carrito?')
    const index = id - 1;
    if (op) {
        objetcs.splice(index, 1);
        limpiar();
    }

}
function limpiar() {
    document.getElementById('div-list').innerHTML = ``;
    document.getElementById("cart-mostrar").setAttribute('name', 'mostrar');
}

//toco asi porque aja colores de los botones del model


function mostrar_modal() {
    let modal = document.getElementById('modal');
    modal.setAttribute('class', 'modal');
    setTimeout(() => {
        modal.innerHTML = `
        <section class="images">
        <img id="close" onclick="close_modal()" class="close" src="images/icon-close.svg" alt="">
        <div id="container" class="container">
          <img id="previous" onclick="previous()" class="op" src="images/icon-previous.svg" alt="">
          <img class="img-scroll" src="#" alt="">
          <img class="img-scroll" src="#" alt="">
          <img class="img-scroll" src="#" alt="">
          <img id="1" class="img-scroll" src="images/image-product-1.jpg" alt="">
          <img id="2" class="img-scroll" src="images/image-product-2.jpg" alt="">
          <img id="3" class="img-scroll" src="images/image-product-3.jpg" alt="">
          <img id="4" class="img-scroll" src="images/image-product-4.jpg" alt="">
          <img id="next" onclick="next()" class="op" src="images/icon-next.svg" alt="">
        </div>
      </section>
    `;
    }, 500)
  
}

function next() {
    let div_cont = document.getElementById('container');
    div_cont.scrollBy(600, 0);
}
function previous() {
    let div_cont = document.getElementById('container');
    div_cont.scrollBy(-600, 0);
}
function close_modal() {
    let modal = document.getElementById('modal');
    modal.removeAttribute('class');
    modal.innerHTML = ``;
}
//responsive
let body = document.getElementById('body');
body.addEventListener('mousemove',()=> responsive());
function responsive() {
    let body = document.getElementById('body');
    let menu = document.getElementById('menu');
    console.log(body.clientWidth)
    
    if (body.clientWidth < '750') {
        menu.innerHTML = `
        <img class="img-menu" onclick="mostrar_menu()" src="images/icon-menu.svg" alt="">
      <h3 class="name-company">sneakers</h3>
          
          <div class="button-header">
            <button onclick="cart()" id="cart-mostrar" name="mostrar"><img class="cart" src="images/icon-cart.svg"
                alt=""></button>
            <button><img class="avatar" src="images/image-avatar.png" alt=""></button>
          </div>
        `;

    } else {
        menu.innerHTML = `
        <h3 class="name-company">sneakers</h3>
          <nav class="links">
            <a href="#">Collections</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div class="button-header">
            <button onclick="cart()" id="cart-mostrar" name="mostrar"><img class="cart" src="images/icon-cart.svg"
                alt=""></button>
            <button><img class="avatar" src="images/image-avatar.png" alt=""></button>
          </div>
        `;
    }
}

//mostar menu movil
function mostrar_menu(){
    let menu_movil = document.getElementById('menu-movil');
    menu_movil.setAttribute('class','menu-movil');
    menu_movil.innerHTML = `
    <ul class="ul">
      <img onclick="cerrar_menu()" src="images/icon-close.svg" alt="">
      <li><a href="#">Collections</a></li>
      <li><a href="#">Men</a></li>
      <li><a href="#">Women</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contac</a>t</li>
    </ul>
    `;
}
function cerrar_menu(){
    let menu_movil = document.getElementById('menu-movil');
    menu_movil.removeAttribute('class');
    menu_movil.innerHTML = ``;
}