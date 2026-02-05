let cart = [];

// 1. Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const sizeSelect = button.parentElement.querySelector('.size-select');
        const size = sizeSelect.value;

        if (!size) {
            alert("Please select a size first!");
            return;
        }

        // Add item object to cart array
        cart.push({ name, price: parseFloat(price), size });
        
        // Update the UI
        updateCartUI();
        alert(`${name} (${size}) added to your cart.`);
    });
});

function updateCartUI() {
    document.getElementById('cart-count').innerText = `Items in Cart: ${cart.length}`;
}

// 2. Modal Controls
const modal = document.getElementById('terms-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeBtn = document.getElementById('close-modal');

checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        modal.style.display = "block";
    }
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Close modal if user clicks the dark background
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 3. PayPal Integration
paypal.Buttons({
    createOrder: function(data, actions) {
        // Calculate the total price dynamically from the cart
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2) // Formats to 0.00
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert(`Thank you ${details.payer.name.given_name}! Your order has been placed.`);
            
            // Clear cart after successful payment
            cart = [];
            updateCartUI();
            modal.style.display = "none";
        });
    },
    onError: function(err) {
        console.error("PayPal Error:", err);
        alert("An error occurred with the payment process.");
    }
}).render('#paypal-button-container');
