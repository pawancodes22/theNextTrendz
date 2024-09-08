import './index.css'

const PriceItem = props => {
  const {item} = props
  const {title, quantity, price} = item
  return (
    <li className="price-item-container">
      <p className="price-para title-text">{quantity}</p>
      <p className="price-para">{title}</p>
      <p className="price-para">{price}</p>
    </li>
  )
}
export default PriceItem
