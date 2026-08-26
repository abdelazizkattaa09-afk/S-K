// ==============================
// S&G BAGS
// PANIER + WHATSAPP
// ==============================


const cart = [];


// ELEMENTS HTML

const cartElement =
    document.getElementById("cart");

const cartButton =
    document.getElementById("cartBtn");

const closeButton =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");



// ==============================
// OUVRIR PANIER
// ==============================

cartButton.addEventListener(
    "click",
    () => {

        cartElement.classList.add("open");

        overlay.classList.add("show");

    }
);



// ==============================
// FERMER PANIER
// ==============================

closeButton.addEventListener(
    "click",
    closeCart
);


overlay.addEventListener(
    "click",
    closeCart
);


function closeCart() {

    cartElement.classList.remove("open");

    overlay.classList.remove("show");

}



// ==============================
// AJOUTER PRODUIT
// ==============================

document
    .querySelectorAll(".add-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.name;

                const price =
                    Number(
                        button.dataset.price
                    );


                const existingProduct =
                    cart.find(
                        product =>
                            product.name === name
                    );


                if (existingProduct) {

                    existingProduct.quantity++;

                } else {

                    cart.push({

                        name: name,

                        price: price,

                        quantity: 1

                    });

                }


                updateCart();


                cartElement.classList.add(
                    "open"
                );


                overlay.classList.add(
                    "show"
                );

            }
        );

    });



// ==============================
// ACTUALISER PANIER
// ==============================

function updateCart() {


    // NOMBRE TOTAL DE PRODUITS

    const totalProducts =
        cart.reduce(
            (total, product) => {

                return total +
                    product.quantity;

            },
            0
        );


    cartCount.textContent =
        totalProducts;



    // PANIER VIDE

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Votre panier est vide.</p>";

        cartTotal.textContent =
            "0 DH";

        return;

    }



    // AFFICHER PRODUITS

    cartItems.innerHTML = "";


    cart.forEach(
        (product, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "cart-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ${} DH
                        ×
                        ${product.quantity}
                    </p>

                </div>


                <button
                    onclick="removeProduct(${index})">

                    Supprimer

                </button>

            `;


            cartItems.appendChild(item);

        }
    );



    // CALCUL TOTAL

    const total =
        cart.reduce(
            (sum, product) => {

                return sum +
                    product.price *
                    product.quantity;

            },
            0
        );


    cartTotal.textContent =
        total + " DH";

}



// ==============================
// SUPPRIMER PRODUIT
// ==============================

function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();

}



// ==============================
// COMMANDER SUR WHATSAPP
// ==============================

document
    .getElementById("checkout")
    .addEventListener(
        "click",
        () => {


            // SI PANIER VIDE

            if (cart.length === 0) {

                alert(
                    "Votre panier est vide."
                );

                return;

            }



            // NUMERO WHATSAPP

            const phone =
                "212771032849";



            // MESSAGE

            let message =
                "Bonjour S&G Bags 👋\n\n";

            message +=
                "Je souhaite commander :\n\n";



            // PRODUITS

            cart.forEach(
                product => {

                    message +=
                        "👜 " +
                        product.name +
                        " x" +
                        product.quantity +
                        " = " +
                        (
                            product.price *
                            product.quantity
                        ) +
                        " DH\n";

                }
            );



            // TOTAL

            const total =
                cart.reduce(
                    (sum, product) => {

                        return sum +
                            product.price *
                            product.quantity;

                    },
                    0
                );


            message +=
                "\n💰 Total : " +
                total +
                " DH";


            message +=
                "\n\nMerci !";



            // OUVRIR WHATSAPP

            const whatsappURL =
                "https://wa.me/" +
                phone +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );