document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.querySelector(".cart-count");
    const cartModal = document.querySelector(".cart-modal");
    const closeCart = document.querySelector(".close-cart");
    const cartBody = document.querySelector(".cart-modal-body");
    const confirmOrder = document.querySelector(".confirm-order");
    let cartItems = [];

    // Update Cart Count
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const card = button.closest(".card");
            const title = card.querySelector(".card--title").textContent;
            const quantity = parseInt(card.querySelector(".quantity").textContent);
            const price = card.querySelector(".price").textContent;

            // Add item to cart
            cartItems.push({ title, quantity, price });
            updateCartCount();
        });
    });

    // Open Cart
    cartIcon.addEventListener("click", function () {
        cartModal.classList.remove("hidden");
        renderCart();
    });

    // Close Cart
    closeCart.addEventListener("click", function () {
        cartModal.classList.add("hidden");
    });

    // Render Cart Items
    function renderCart() {
        cartBody.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="T">
                    <div>
                        <h5 class="item0">${item.title}</h5>
                        <p class="detail0">${item.quantity} pcs - ${item.price}</p>
                    </div>
                        <button class="remove-item" data-index="${index}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <hr class="T-hr">
            `;
            cartBody.appendChild(cartItem);
        });

        // Remove item from cart
        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart();
            });
        });
    }

    // Confirm Order
    confirmOrder.addEventListener("click", function () {
        alert("Order Confirmed!");
        cartItems = [];
        updateCartCount();
        renderCart();
        cartModal.classList.add("hidden");
    });

    // Quantity Adjustment
    document.querySelectorAll(".card").forEach((card) => {
        const minusBtn = card.querySelector(".minus");
        const plusBtn = card.querySelector(".plus");
        const quantityElement = card.querySelector(".quantity");
        const detailsElement = card.querySelector(".card--details");
        const priceElement = card.querySelector(".price");

        let quantity = 3;

        function updateDetails() {
            // Get prices from data attributes
            const priceFor3 = card.getAttribute("data-price-3");
            const priceFor6 = card.getAttribute("data-price-6");
            const priceFor12 = card.getAttribute("data-price-12");

            // Update details and price based on quantity
            if (quantity === 3) {
                detailsElement.textContent = "كوكيز 3 + صوص شوكلاته";
                priceElement.textContent = `${priceFor3}`;
            } else if (quantity === 6) {
                detailsElement.textContent = "كوكيز 6 + صوص شوكلاته";
                priceElement.textContent = `${priceFor6}`;
            } else if (quantity === 12) {
                detailsElement.textContent = "كوكيز 12 + 2صوص شوكلاته";
                priceElement.textContent = `${priceFor12}`;
            }
        }

        // Increase quantity
        plusBtn.addEventListener("click", function () {
            if (quantity === 3) quantity = 6;
            else if (quantity === 6) quantity = 12;
            quantityElement.textContent = quantity;
            updateDetails();
        });

        // Decrease quantity
        minusBtn.addEventListener("click", function () {
            if (quantity === 12) quantity = 6;
            else if (quantity === 6) quantity = 3;
            quantityElement.textContent = quantity;
            updateDetails();
        });

        // Initialize details
        updateDetails();
    });
});


















