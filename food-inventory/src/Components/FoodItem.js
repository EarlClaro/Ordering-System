import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/food_items/')
      .then(response => setFoodItems(response.data))
      .catch(error => console.error('Error fetching food items:', error));
  }, []);

  return (
    <div>
      <h1>Food Items</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.stock_quantity} in stock
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItems;
