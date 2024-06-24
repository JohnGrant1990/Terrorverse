document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
    const cartTableBody = document.querySelector('#cart-table tbody');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const productName = card.dataset.name;
            const productPrice = parseFloat(card.dataset.price);

            if (!cart[productName]) {
                cart[productName] = { price: productPrice, quantity: 0 };
            }
            cart[productName].quantity += 1;

            updateCartTable();
        });
    });

    function updateCartTable() {
        cartTableBody.innerHTML = '';
        let totalAmount = 0;

        for (const [productName, productDetails] of Object.entries(cart)) {
            const total = productDetails.price * productDetails.quantity;
            totalAmount += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${productName}</td>
                <td>$${productDetails.price.toFixed(2)}</td>
                <td>${productDetails.quantity}</td>
                <td>$${total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger remove-from-cart" data-name="${productName}">Eliminar</button>
                </td>
            `;
            cartTableBody.appendChild(row);
        }

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.dataset.name;
                delete cart[productName];
                updateCartTable();
            });
        });
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Compra simulada. Total: $' + calculateTotal().toFixed(2));
        clearCart();
    });

    function calculateTotal() {
        return Object.values(cart).reduce((total, product) => total + product.price * product.quantity, 0);
    }

    function clearCart() {
        for (const key in cart) {
            delete cart[key];
        }
        updateCartTable();
    }
});