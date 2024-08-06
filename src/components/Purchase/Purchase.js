import './Purchase.css'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


//vou ter que dividir cart item e purchase em diferentes arquivos

export default function Purchase({ type, product_type, name, price, image, stock, id, qty, removeFromCart, changeProductQty, setTotalItems, setTotalPrice }) {

    const { currentUser } = useSelector(rootReducer => rootReducer.userReducer)

    const [product_qty, setProduct_qty] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let product = currentUser.cart.filter(element => element._id === id)
        if(product[0].stock < product[0].qty){
            setProduct_qty(product[0].stock)
        } else {
            setProduct_qty(product[0].qty)
        }
    }, [])

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
            changeProductQty(id, (product_qty -1))
            setProduct_qty(state => state - 1)
            setTotalItems(state => state - 1)
            setTotalPrice(state => state - price)
        }
    }

    switch (type) {
        case 'purchase':
            return (
                <div className="purchase">
                    <div className='purchase-info'>
                        <img src={image} width={100} />
                        <div className='purchase-description'>
                            <h1>{name}</h1>
                            <div>
                                <p className='purchase-description-price'><span>R$ </span>{price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                                {/* <p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</p> */}
                                <p>Data</p>
                            </div>
                        </div>
                    </div>

                    <button className='purchase-btn-show' onClick={showProduct}>Ver Produto</button>
                </div>
            )

        case 'cart-item':

            return (
                <div className="purchase">
                    <div className='purchase-info'>
                        <img src={image} width={100} />
                        <div className='purchase-description'>
                            <h1>{name}</h1>

                            <div className='purchase-description-stock'>
                                <FiMinus size={13} onClick={less_qty} cursor={'pointer'} />
                                <span>{product_qty}</span>
                                <FiPlus size={13} onClick={more_qty} cursor={'pointer'} />
                            </div>

                            <div>
                                <p className='purchase-description-price'><span>R$ </span>{(price * product_qty).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-cart-list-btns'>
                        <button className='my-cart-list-btn-show' onClick={showProduct}>Ver Produto</button>
                        <button className='my-cart-list-btn-remove' onClick={() => removeFromCart(id, price, product_qty)}>Remover</button>
                    </div>
                </div>
            )

        default:
            <div></div>
    }
}