import './CartItem.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiPlus, FiMinus } from 'react-icons/fi'


export default function CartItem({ product_type, name, price, image, stock, qty, id, removeFromCart, changeProductQty, setTotalItems, setTotalPrice }) {

    const navigate = useNavigate()

    const [product_qty, setProduct_qty] = useState(qty)

    function showProduct() {
        navigate(`/${product_type}/${id}`)
    }

    function more_qty() {
        if (product_qty < stock) {
            changeProductQty(id, (product_qty + 1))
            setProduct_qty(state => state + 1)
            setTotalItems(state => state + 1)
            setTotalPrice(state => state + price)
        }
    }

    function less_qty() {
        if (product_qty > 1) {
            changeProductQty(id, (product_qty - 1))
            setProduct_qty(state => state - 1)
            setTotalItems(state => state - 1)
            setTotalPrice(state => state - price)
        }
    }


    return (
        <div className="cart-item">
            <div className='cart-item-info'>
                <img alt='Imagem do Produto' src={image} width={100} />
                <div className='cart-item-description'>
                    <h1>{name}</h1>

                    <div className='cart-item-description-stock'>
                        <div className='cart-item-description-stock-qty'>
                            <FiMinus size={16} onClick={less_qty} cursor={'pointer'} />
                            <span>{product_qty}</span>
                            <FiPlus size={16} onClick={more_qty} cursor={'pointer'} />
                        </div>
                        <div>
                            <p className='cart-item-description-price'><span>R$ </span>{(price * product_qty).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='cart-item-list-btns'>
                <button className='cart-item-list-btn-show' onClick={showProduct}>Ver Produto</button>
                <button className='cart-item-list-btn-remove' onClick={() => removeFromCart(id, price, product_qty)}>Remover</button>
            </div>
        </div>
    )

}