import './MyCartList.css'
import { useDispatch, useSelector } from "react-redux"
import Purchase from "../Purchase/Purchase"
import api from '../../api/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function MyCartList() {

    const { currentUser } = useSelector(rootReducer => rootReducer.userReducer)
    const [cartItems, setCartItems] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        async function loadCart() {
            await currentUser.cart.map((element) => {
                setCartItems((prev_products) => [...prev_products, element])
                setTotalPrice(state => state + (element.price * element.qty))
                setTotalItems(state => state + element.qty)
            })
        }

        loadCart()
    }, [])


    async function handleBuy() {
        cartItems.map((element) => {
            element.date = new Date()
        })

        console.log(cartItems)

        // await api.post('/purchase/buy', { user_id: currentUser._id, updatedList: cartItems })
        //     .then((res) => toast.success(res.data))
        //     .catch((res) => console.log(res))

        // dispatch({ type: 'UPDATE_USER', payload: { cart: [], purchases: cartItems} })
        // setCartItems([])
    }


    async function changeProductQty(id, qty) {
        let updated_cart = []

        await cartItems.map((element) => {
            if (element._id === id) {
                element.qty = qty
                updated_cart.push(element)
            } else {
                updated_cart.push(element)
            }
        })

        setCartItems(updated_cart)
        dispatch({ type: 'UPDATE_USER', payload: { cart: updated_cart } })

        await api.post('/purchase/updateCart', { user_id: currentUser._id, updated_cart })
    }


    //chamo essa função aqui porém ela é realizada no componente filho (Purchase) para atualizar a lista
    async function removeFromCart(id, price, product_qty) {
        //aqui filtro o produto no qual quero remover e seto no carrinho da página
        let updated_cart = currentUser.cart.filter(e => e._id !== id)
        setCartItems(updated_cart)
        setTotalItems(state => state - product_qty)
        setTotalPrice(state => state - (price * product_qty))

        //aqui eu atualizo o carrinho do usuário no store do userReducer
        dispatch({ type: 'UPDATE_USER', payload: { cart: updated_cart } })


        //aqui eu removo do usuário no banco de dados o item do carrinho
        await api.post('/purchase/removeCart', { user_id: currentUser._id, product_id: id })
            .then((res) => {
                toast.info(res.data)
            })
            .catch(err => console.log(err))
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
                                product_type={item.type}
                                name={item.name}
                                price={item.price}
                                image={item.img}
                                stock={item.stock}
                                id={item._id}
                                removeFromCart={removeFromCart}
                                changeProductQty={changeProductQty}
                                setTotalItems={setTotalItems}
                                setTotalPrice={setTotalPrice}
                            />
                        )

                    }))

                    :

                    (<div className='my-cart-empty'>Está Vazio...</div>)

            }

            {
                cartItems.length > 0 ?
                    (
                        <div className='my-cart-total'>
                            <div className='my-cart-total-left'>
                                <h2>Resumo da Compra</h2>
                                <div>Produto(s): {totalItems}</div>
                                <div style={{ fontWeight: 'bold' }}>Valor Total: R$ {totalPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</div>
                            </div>

                            <button onClick={handleBuy}>Comprar</button>
                        </div>
                    )

                    :

                    <></>
            }

        </div >
    )
}