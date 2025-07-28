// app/page.jsx
"use client";

import { useCart } from "../context/CartContext";

const foodItems = [
  { id: 1, name: "Pizza", price: 10 },
  { id: 2, name: "Burger", price: 8 },
  { id: 3, name: "Pasta", price: 12 },
  { id: 4, name: "Salad", price: 7 },
];

export default function Test() {
  const { cart, addToCart, removeFromCart, grandTotal } = useCart();

  // Calculate total quantity of all items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // Get item quantity from cart
  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {foodItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            {getCartItemQuantity(item.id) > 0 ? (
              <div>
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span> Quantity: {getCartItemQuantity(item.id)} </span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>

      <h1>Cart</h1>
      {cart.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.newPrice}</td>
                <td>{item.quantity}</td>
                <td>${item.newPrice * item.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>
                <strong>Grand Total:</strong>
              </td>
              <td colSpan="2">${grandTotal}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>
                <strong>Total Quantity:</strong>
              </td>
              <td colSpan="2">{totalQuantity}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p>The cart is empty.</p>
      )}
    </div>
  );
}
