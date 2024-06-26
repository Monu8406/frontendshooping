import React from 'react'

import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      {localStorage.getItem('auth-token')?<Link to={`product/${props.id}`}> <img className='img' onClick={window.scrollTo(0,0)} src={props.image} alt="" /> </Link>:<Link to="/"> <img  className='img' onClick={window.scrollTo(0,0)}  src={props.image}  alt="" /> </Link>}
     <p className='name'>{props.name}</p>
    <div className='item-prices'>
        <div className="item-price-new">
           {props.new_price} Rs
        </div>
        <div className="item-price-old">
            {props.old_price} Rs
        </div>
        </div>
    </div>
  )
}

export default Item