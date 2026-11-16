const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    image: "images/laptop.jpg"
  },
  {
    id: 2,
    name: "Headphones",
    price: 2500,
    image: "images/headphones.jpg"
  },
  {
    id: 3,
    name: "Keyboard",
    price: 1500,
    image: "images/keyboard.jpg"
  },
  {
    id: 4,
    name: "Mouse",
    price: 1000,
    image: "images/mouse.jpg"
  },
  {
    id: 5,
    name: "Smartphone",
    price: 30000,
    image: "images/smartphone.jpg"
  },
];

let cart = [];

function displayProducts() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  products.forEach(function (product) {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">₹${product.price.toLocaleString()}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });

  if (!product) return;

  const existingProduct = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    updateBill();
    return;
  }

  cart.forEach(function (item) {
    cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>₹${item.price.toLocaleString()}</p>
        </div>

        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>

        <strong>₹${(item.price * item.quantity).toLocaleString()}</strong>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  updateBill();
}

function increaseQuantity(productId) {
  const product = cart.find(function (item) {
    return item.id === productId;
  });

  if (product) {
    product.quantity += 1;
    displayCart();
  }
}

function decreaseQuantity(productId) {
  const product = cart.find(function (item) {
    return item.id === productId;
  });

  if (!product) return;

  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    removeFromCart(productId);
    return;
  }

  displayCart();
}

function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  displayCart();
}

function updateBill() {
  let subtotalPrice = 0;

  cart.forEach(function (item) {
    subtotalPrice += item.price * item.quantity;
  });

  let discount = 0;
  if (subtotalPrice > 10000) {
    discount = subtotalPrice * 0.05;
  }

  const finalAmount = subtotalPrice - discount;

  document.getElementById("subtotal").textContent = `₹${subtotalPrice.toLocaleString()}`;
  document.getElementById("discount").textContent = `₹${discount.toLocaleString()}`;
  document.getElementById("final-amount").textContent = `₹${finalAmount.toLocaleString()}`;
}

displayProducts();
displayCart();
