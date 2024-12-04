// Function to add items to the cart and store them in localStorage
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // If product exists, increase the quantity and update the total price
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
    } else {
        // Otherwise, add a new item to the cart with quantity 1
        const item = {
            name: productName,
            price: price,
            quantity: 1,
            totalPrice: price
        };
        cart.push(item);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Display a toast notification
    showToast(`${productName} has been added to your cart!`);
}

// Function to show a toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // 3000ms = 3 seconds
}

// Function to update the cart on the cart page
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById("cart-items");
    const totalPriceDiv = document.getElementById("total-price");
    let totalAmount = 0;
    cartDiv.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p>${item.name} (x${item.quantity}) - Rs. ${item.totalPrice}</p>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartDiv.appendChild(div);
        totalAmount += item.totalPrice; // Add up the total cost
    });

    totalPriceDiv.textContent = totalAmount; // Update the total price on the cart page
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item from the cart
    cart.splice(index, 1);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart UI after removal
    updateCart();
}

// Function to clear the entire cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCart(); // Refresh the cart display
}

// Update the cart when the page loads (only on carted page)
if (document.getElementById("cart-items")) {
    updateCart();
}
