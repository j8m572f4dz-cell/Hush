let cart = [];

// Handle Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const size = button.parentElement.querySelector('.size-select').value;

        if (size === "Size") {
            alert("Please select a size first!");
            return;
        }

        cart.push({ name, price, size });
        document.getElementById('cart-display').innerText = `Items in Cart: ${cart.length}`;
        alert(`${name} (${size}) added to cart!`);
    });
});

// Modal Logic
const modal = document.getElementById('terms-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeBtn = document.getElementById('close-modal');
const acceptBtn = document.getElementById('accept-terms');

checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        modal.style.display = "block";
    }
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}

acceptBtn.onclick = () => {
    alert("Proceeding to payment...");
    // Here is where you would integrate Stripe, PayPal, or a redirect
    modal.style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Ready for future features (cart, animations, etc.)
