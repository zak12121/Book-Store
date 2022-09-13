import "./App.css"
import Discounted from "./components/Discounted";
import Explore from "./components/Explore";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Highlights from "./components/Highlights";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { books } from './data.js'
import BookInfo from "./Pages/BookInfo";
import Cart from "./Pages/Cart";
import React, { useState, useEffect } from 'react';

function App() {
  const [cart, setCart]= useState([]);

  function addToCart(book){
    const dupeItem = cart.find((item) => +item.id === +book.id);
    if (dupeItem){
      setCart(cart.map(item => {
      if ( +item.id=== +dupeItem.id){
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      } else{
        return item
      }
      }))
    } else{
      setCart([...cart, {...book, quantity:1}])
    }
  }
    
  useEffect(()=>{
    console.log(cart)
  },[cart])

 
    
  function changeQuantity(book, quantity){
    setCart(
      cart.map((item) => 
        item.id===book.id ? 
          {
            ...item,
            quantity: +quantity
          } :
          item
      )
    );   
  }

  function removeItem(item){
    setCart(cart.filter(book => book.id !== item.id)); //removes that item  
  }

  function numberOfItems(){
    let counter =0;
    cart.forEach( item =>{
      counter += item.quantity
    })
    return counter;
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/books" element={<Books books={books}/>}/>
          {/* <Route path="/books" element={()=> <Books books={books}/>}/> */}
          <Route path="/books/:id" element={<BookInfo books={books} 
          addToCart={addToCart} cart={cart}/>}/>
          <Route path="/cart" element={<Cart books={books} cart={cart}
          changeQuantity={changeQuantity} removeItem={removeItem}/>} />
        </Routes>
      </div>
    </Router>  // use a href to direct to new website, Link requires to be reloaded
  );
}

export default App;
