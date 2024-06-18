import './Purchase.css'
import { useNavigate } from 'react-router-dom'

export default function Purchase({ type, name, price, image, id, removeFromCart, date }) {

    const navigate = useNavigate()

    function showProduct() {
        navigate(`/${name}s/${id}`)
    }

    switch (type) {
        case 'purchase':
            return (
                <div className="purchase">
                    <div className='purchase-info'>
                        <img src={image} width={100} />
                        <div className='purchase-description'>
                            <h1>{`${name} ${id}`}</h1>
                            <div>
                                <p className='purchase-description-price'><span>R$ </span>{price},00</p>
                                <p>{date}</p>
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
                            <h1>{`${name} ${id}`}</h1>
                            <div>
                                <p className='purchase-description-price'><span>R$ </span>{price}</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-cart-list-btns'>
                        <button className='my-cart-list-btn-show' onClick={showProduct}>Ver Produto</button>
                        <button className='my-cart-list-btn-remove' onClick={removeFromCart}>Remover</button>
                    </div>
                </div>
            )

        default:
            <div></div>
    }
}