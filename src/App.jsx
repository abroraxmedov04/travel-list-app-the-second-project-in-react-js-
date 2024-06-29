import React, { useState } from "react";
import "../src/App.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handletoggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <>
      <Logo />
      <Form onAdditems={handleAddItems} />
      <PackingList
        items={items}
        onItemDelete={handleDeleteItem}
        onToggleItems={handletoggleitem}
      />
      <Stats items={items} />
    </>
  );
}

function Logo() {
  return <h1>🌴 Far away 💼</h1>;
}

function Form({ onAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAdditems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😁 trip ? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onItemDelete, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onItemDelete={onItemDelete}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Add some items to you travel list 🗺</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You are ready to fly"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

function Item({ item, onItemDelete, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onItemDelete(item.id)}>❌</button>
    </li>
  );
}


// thinking in React JS 
// state managment 
// Lifting state up
// delete, check, edit right approach 
// derived state
// more components )
// children prop


// challenges: 
// Accordian, children prop practice , tip calculator, travel list