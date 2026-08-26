const cart = [];

const cartElement = document.getElementById("cart");
const cartButton = document.getElementById("cartBtn");
const closeButton = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// OUVRIR LE PANIER

cartButton.addEventListener("click", () => {
    cartElement.classList.add("open");
    overlay.classList.add("show");
});


// FERMER LE PANIER

closeButton.addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

function closeCart() {
    cartElement.classList.remove("open");
    overlay.classList.remove("show");
}


// AJOUTER LES PRODUITS AU PANIER

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const product = cart.find(item => item.name === name);

        if (product) {
            product.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        cartElement.classList.add("open");
        overlay.classList.add("show");
    });

});


// ACTUALISER LE PANIER

function updateCart() {

    const numberOfProducts = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartCount.textContent = numberOfProducts;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Votre panier est vide.</p>";

        cartTotal.textContent = "0 DH";

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((product, index) => {

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>

                <p>
                    ${product.price} DH × ${product.quantity}
                </p>
            </div>

            <button onclick="removeProduct(${index})">
                Supprimer
            </button>
        `;

        cartItems.appendChild(item);
    });


    const total = cart.reduce(
        (sum, product) =>
            sum + product.price * product.quantity,
        0
    );

    cartTotal.textContent = total + " DH";
}


// SUPPRIMER PRODUIT

function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();
}


// COMMANDER SUR WHATSAPP

document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }


    const phone = "212771032849";


    let message = "Bonjour S&G Bags 👋\n\n";

    message += "Je souhaite commander :\n\n";


    cart.forEach(product => {

        const subtotal =
            product.price * product.quantity;

        message +=
            "👜 " +
            product.name +
            " x" +
            product.quantity +
            " = " +
            subtotal +
            " DH\n";
    });


    const total = cart.reduce(
        (sum, product) =>
            sum + product.price * product.quantity,
        0
    );


    message +=
        "\n💰 Total : " +
        total +
        " DH";


    message +=
        "\n\nMerci !";


    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

});