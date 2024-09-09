import Popup from 'reactjs-popup'
import {useState} from 'react'

import Header from '../Header'
import CartListView from '../CartListView'
import PriceItem from '../PriceItem'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const [paymentModeSelected, alterPaymentModeSelected] = useState(true)
  const changePaymentMethod = () => {
    alterPaymentModeSelected(false)
  }
  const submitForm = event => {
    event.preventDefault()
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        // TODO: Update the functionality to remove all the items in the cart
        const orderTotal = () => {
          let total = 0
          cartList.map(item => {
            total += item.price * item.quantity
            return total
          })
          return total
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    onClick={removeAllCartItems}
                    className="remove-all-button"
                  >
                    Remove All
                  </button>
                  <CartListView />
                  {/* TODO: Add your code for Cart Summary here */}
                  <div className="total-summary">
                    <h1 className="bold-text">
                      <span className="order-total-text">Order Total:</span> Rs{' '}
                      {orderTotal()}/-
                    </h1>
                    <p className="order-total-text">
                      {cartList.length} items in cart
                    </p>
                    <Popup
                      trigger={
                        <button className="button" type="button">
                          {' '}
                          Checkout{' '}
                        </button>
                      }
                      modal
                      nested
                    >
                      {close => (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <div className="header"> Checkout </div>
                          <div className="content">
                            <div className="price-item-container">
                              <p className="price-para title-text bolder">
                                Title
                              </p>
                              <p className="price-para bolder">Quantity</p>
                              <p className="price-para bolder">Price</p>
                              <p className="price-para bolder">Total Price</p>
                            </div>
                            <ul className="space-remover">
                              {cartList.map(item => (
                                <PriceItem key={item.id} item={item} />
                              ))}{' '}
                            </ul>
                            <div className="price-item-container">
                              <p className="price-para bolder final-price-para">
                                Final Price
                              </p>
                              <p className="price-para bolder">
                                {orderTotal()}/-
                              </p>
                            </div>
                            <p className="price-para title-text bolder">
                              Payment Method
                            </p>
                            <form onSubmit={submitForm}>
                              <ul className="payment-methods-container">
                                <li className="payment-method-item">
                                  <input type="radio" id="card" disabled />
                                  <label htmlFor="card">Card</label>
                                </li>
                                <li className="payment-method-item">
                                  <input type="radio" id="card" disabled />
                                  <label htmlFor="card">Net Banking</label>
                                </li>
                                <li className="payment-method-item">
                                  <input type="radio" id="card" disabled />
                                  <label htmlFor="card">UPI</label>
                                </li>
                                <li className="payment-method-item">
                                  <input type="radio" id="card" disabled />
                                  <label htmlFor="card">Wallet</label>
                                </li>
                                <li className="payment-method-item">
                                  <input
                                    type="radio"
                                    id="card"
                                    onChange={changePaymentMethod}
                                  />
                                  <label htmlFor="card">Cash On Delivery</label>
                                </li>
                              </ul>
                              {paymentModeSelected && (
                                <p className="error-msg">
                                  *Select a payment Method
                                </p>
                              )}
                            </form>
                          </div>
                          <div className="actions">
                            <Popup
                              trigger={
                                <button className="button"> Trigger </button>
                              }
                              position="top center"
                              nested
                            >
                              <span className="bg-span">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Beatae magni omnis delectus
                                nemo, maxime molestiae dolorem numquam mollitia,
                                voluptate ea, accusamus excepturi deleniti
                                ratione sapiente! Laudantium, aperiam doloribus.
                                Odit, aut.
                              </span>
                            </Popup>
                            <button
                              className="button"
                              onClick={() => {
                                console.log('modal closed ')
                                close()
                              }}
                            >
                              close modal
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Cart
