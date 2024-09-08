import Popup from 'reactjs-popup'

import Header from '../Header'
import CartListView from '../CartListView'
import PriceItem from '../PriceItem'

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
                  <Popup
                    trigger={<button className="button"> Checkout </button>}
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
                          <ul>
                            {cartList.map(item => (
                              <PriceItem key={item.id} item={item} />
                            ))}{' '}
                          </ul>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Atque, a nostrum. Dolorem, repellat quidem ut,
                          minima sint vel eveniet quibusdam voluptates delectus
                          doloremque, explicabo tempore dicta adipisci fugit
                          amet dignissimos?
                          <br />
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Consequatur sit commodi beatae optio voluptatum
                          sed eius cumque, delectus saepe repudiandae explicabo
                          nemo nam libero ad, doloribus, voluptas rem alias.
                          Vitae?
                        </div>
                        <div className="actions">
                          <Popup
                            trigger={
                              <button className="button"> Trigger </button>
                            }
                            position="top center"
                            nested
                          >
                            <span>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Beatae magni omnis delectus
                              nemo, maxime molestiae dolorem numquam mollitia,
                              voluptate ea, accusamus excepturi deleniti ratione
                              sapiente! Laudantium, aperiam doloribus. Odit,
                              aut.
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
export default Cart
