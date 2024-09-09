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
  const [paymentSuccessful, alterPaymentSuccessful] = useState(false)
  const changePaymentMethod = () => {
    alterPaymentModeSelected(false)
  }
  const submitForm = () => {
    alterPaymentSuccessful(true)
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
                        <button
                          className="button"
                          type="button"
                          onClick={() => alterPaymentModeSelected(false)}
                        >
                          {' '}
                          Checkout{' '}
                        </button>
                      }
                      modal
                      nested
                    >
                      {close =>
                        paymentSuccessful ? (
                          <div className="modal">
                            <p className="order-placed-para">
                              Your order has been placed
                            </p>
                            <button className="close" onClick={close}>
                              &times;
                            </button>
                          </div>
                        ) : (
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
                                    <label
                                      className="payment-label"
                                      htmlFor="card"
                                    >
                                      Card
                                    </label>
                                  </li>
                                  <li className="payment-method-item">
                                    <input type="radio" id="card" disabled />
                                    <label
                                      className="payment-label"
                                      htmlFor="card"
                                    >
                                      Net Banking
                                    </label>
                                  </li>
                                  <li className="payment-method-item">
                                    <input type="radio" id="card" disabled />
                                    <label
                                      className="payment-label"
                                      htmlFor="card"
                                    >
                                      UPI
                                    </label>
                                  </li>
                                  <li className="payment-method-item">
                                    <input type="radio" id="card" disabled />
                                    <label
                                      className="payment-label"
                                      htmlFor="card"
                                    >
                                      Wallet
                                    </label>
                                  </li>
                                  <li className="payment-method-item">
                                    <input
                                      type="radio"
                                      id="card"
                                      onChange={changePaymentMethod}
                                    />
                                    <label
                                      className="payment-label"
                                      htmlFor="card"
                                    >
                                      Cash On Delivery
                                    </label>
                                  </li>
                                </ul>
                                {paymentModeSelected && (
                                  <p className="error-msg">
                                    *Select a payment Method
                                  </p>
                                )}
                                <button
                                  type="submit"
                                  className="payment-button"
                                  disabled={paymentModeSelected}
                                >
                                  Confirm Payment
                                </button>
                              </form>
                            </div>
                          </div>
                        )
                      }
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
