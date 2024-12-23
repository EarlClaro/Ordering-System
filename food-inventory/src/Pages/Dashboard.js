import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    description: "",
    category: "",
    unit_price: "",
    selling_price: "",
    stock_quantity: "",
    reorder_point: "",
  });
  const [purchaseOrder, setPurchaseOrder] = useState({
    item_name: "",
    quantity: "",
    supplier: "",
  });
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);
  const [showAddPurchaseForm, setShowAddPurchaseForm] = useState(false);

  useEffect(() => {
    // Fetch food items from the server
    axios
      .get('http://localhost:8000/api/fooditems/')
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const handleFoodItemChange = (e) => {
    const { name, value } = e.target;
    setNewFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchaseOrderChange = (e) => {
    const { name, value } = e.target;
    setPurchaseOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodItemSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/fooditems", newFoodItem)
      .then((response) => {
        setFoodItems((prev) => [...prev, response.data]);
        setNewFoodItem({
          name: "",
          description: "",
          category: "",
          unit_price: "",
          selling_price: "",
          stock_quantity: "",
          reorder_point: "",
        });
      })
      .catch((error) => console.error("Error adding food item:", error));
  };

  const handlePurchaseOrderSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/purchaseorders", purchaseOrder)
      .then(() => {
        setPurchaseOrder({
          item_name: "",
          quantity: "",
          supplier: "",
        });
      })
      .catch((error) => console.error("Error adding purchase order:", error));
  };

  return (
    <div className="dashboard-container">
      <div className="left-panel">
      <img src="/avatar.png" alt="Avatar" style={{height: "60px", width: "60px"}}/>
              <h3>Username</h3>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="main-area">
        <h1>Inventory Dashboard</h1>
        <div className="table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Selling Price</th>
                <th>Stock Quantity</th>
                <th>Reorder Point</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.length > 0 ? (
                foodItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.selling_price}</td>
                    <td>{item.stock_quantity}</td>
                    <td>{item.reorder_point}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="form-container">
          <button
            className="toggle-button"
            onClick={() => setShowAddFoodForm(!showAddFoodForm)}
          >
            {showAddFoodForm ? "Hide Add Food Item" : "Add New Food Item"}
          </button>
          {showAddFoodForm && (
            <form className="add-form" onSubmit={handleFoodItemSubmit}>
              <input
                type="text"
                name="name"
                value={newFoodItem.name}
                onChange={handleFoodItemChange}
                placeholder="Name"
                required
              />
              <textarea
                name="description"
                value={newFoodItem.description}
                onChange={handleFoodItemChange}
                placeholder="Description"
                required
              />
              <input
                type="text"
                name="category"
                value={newFoodItem.category}
                onChange={handleFoodItemChange}
                placeholder="Category"
                required
              />
              <input
                type="number"
                name="unit_price"
                value={newFoodItem.unit_price}
                onChange={handleFoodItemChange}
                placeholder="Unit Price"
                required
              />
              <input
                type="number"
                name="selling_price"
                value={newFoodItem.selling_price}
                onChange={handleFoodItemChange}
                placeholder="Selling Price"
                required
              />
              <input
                type="number"
                name="stock_quantity"
                value={newFoodItem.stock_quantity}
                onChange={handleFoodItemChange}
                placeholder="Stock Quantity"
                required
              />
              <input
                type="number"
                name="reorder_point"
                value={newFoodItem.reorder_point}
                onChange={handleFoodItemChange}
                placeholder="Reorder Point"
                required
              />
              <button type="submit">Add Food Item</button>
            </form>
          )}

          <button
            className="toggle-button"
            onClick={() => setShowAddPurchaseForm(!showAddPurchaseForm)}
          >
            {showAddPurchaseForm
              ? "Hide Suggested Purchase Order"
              : "Add Suggested Purchase Order"}
          </button>
          {showAddPurchaseForm && (
            <form className="add-form" onSubmit={handlePurchaseOrderSubmit}>
              <input
                type="text"
                name="item_name"
                value={purchaseOrder.item_name}
                onChange={handlePurchaseOrderChange}
                placeholder="Item Name"
                required
              />
              <input
                type="number"
                name="quantity"
                value={purchaseOrder.quantity}
                onChange={handlePurchaseOrderChange}
                placeholder="Quantity"
                required
              />
              <input
                type="text"
                name="supplier"
                value={purchaseOrder.supplier}
                onChange={handlePurchaseOrderChange}
                placeholder="Supplier"
                required
              />
              <button type="submit">Add Purchase Order</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
