import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
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
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
