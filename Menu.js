// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.querySelector(".cart-count");
    const cartModal = document.querySelector(".cart-modal");
    const closeCartBtn = document.querySelector(".close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const confirmOrderBtn = document.querySelector(".confirm-order");

    let totalItems = 0;
    let cartItems = [];

    // تحديث عدد القطع والسعر والتفاصيل
    const updateCardDetails = (card, quantity) => {
        const details = card.querySelector(".details");
        const price = card.querySelector(".price");

        if (quantity === 3) {
            details.textContent = "3 pieces - Delicious and fresh!";
            price.textContent = "Price: $100";
        } else if (quantity === 6) {
            details.textContent = "6 pieces - Perfect for sharing!";
            price.textContent = "Price: $200";
        } else if (quantity === 12) {
            details.textContent = "12 pieces - Ideal for parties!";
            price.textContent = "Price: $300";
        }
    };

    // تعامل مع الكروت
    cards.forEach(card => {
        const increaseBtn = card.querySelector(".increase");
        const decreaseBtn = card.querySelector(".decrease");
        const quantityDisplay = card.querySelector(".quantity");
        let quantity = 3;

        // عند الضغط على زر +
        increaseBtn.addEventListener("click", () => {
            if (quantity === 3) quantity = 6;
            else if (quantity === 6) quantity = 12;

            quantityDisplay.textContent = quantity;
            updateCardDetails(card, quantity);
        });

        // عند الضغط على زر -
        decreaseBtn.addEventListener("click", () => {
            if (quantity === 12) quantity = 6;
            else if (quantity === 6) quantity = 3;

            quantityDisplay.textContent = quantity;
            updateCardDetails(card, quantity);
        });
    });

    // تحديث عدد الطلبات في السلة
    const updateCartCount = () => {
        cartCount.textContent = totalItems;
    };

    // عرض نافذة السلة
    cartIcon.addEventListener("click", () => {
        cartModal.classList.remove("hidden");
        renderCartItems();
    });

    // إغلاق نافذة السلة
    closeCartBtn.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    // عرض الطلبات داخل السلة
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.name} - ${item.quantity} pieces - $${item.price}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // إضافة وظيفة الإزالة
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                totalItems--;
                cartItems.splice(index, 1);
                updateCartCount();
                renderCartItems();
            });
        });
    };

    // إضافة الطلب إلى السلة
    cards.forEach(card => {
        const addToCartBtn = card.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => {
            const name = card.querySelector("h2").textContent;
            const quantity = card.querySelector(".quantity").textContent;
            const price = card.querySelector(".price").textContent.match(/\d+/)[0];

            cartItems.push({ name, quantity, price });
            totalItems++;
            updateCartCount();
        });
    });

    // تأكيد الطلب
    confirmOrderBtn.addEventListener("click", () => {
        alert("Order Confirmed!");
        cartItems = [];
        totalItems = 0;
        updateCartCount();
        cartModal.classList.add("hidden");
    });
});
