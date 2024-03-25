import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';


export const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([]);
   useEffect(() => {
        fetch("https://backendshopping-qwex.onrender.com/popularinwomen")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }    
                return response.json();
            })
            .then((data) => setPopularProducts(data))
            .catch((error) => {});
    }, []);

    return ( 
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
          <hr />
        <div className='popular-item'>
         {popularProducts.map((item, i) => (
        <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />  ))}
            </div>
        </div>
    );
};
