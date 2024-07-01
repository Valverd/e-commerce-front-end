import './MyCartList.css'
import { useSelector } from "react-redux"
import Purchase from "../Purchase/Purchase"
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function MyCartList() {

    const { currentUser } = useSelector(rootReducer => rootReducer.userReducer)
    const [cartItems, setCartItems] = useState(currentUser.cart)
    

    //chamo essa função aqui porém ela é realizada no componente filho (Purchase) para atualizar a lista
    function removeFromCart(id) {
        let uptadedList = currentUser.cart.filter(e => e.id !== id)
        setCartItems(uptadedList)
        currentUser.cart = uptadedList
        toast.info('Produto removido do carrinho!')
    }

    return (
        <div className="my-cart-list">
            <h1 className='my-cart-title'>Meu Carrinho</h1>
            {
                cartItems.length > 0 ?
                    (cartItems.map((item, i) => {
                        return (
                            <Purchase
                                key={i}
                                type={'cart-item'}
                                name={item.name}
                                price={item.price}
                                image={item.img}
                                id={item.id}
                                removeFromCart={() => removeFromCart(item.id)}
                            />
                        )

                    }))

                    :

                    (<div className='my-cart-empty'>Está Vazio...</div>)
            }
        </div>
    )
}