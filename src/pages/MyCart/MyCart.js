import './MyCart.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import CartItem from '../../components/CartItem/CartItem'
import Modal from '../../components/Modal/Modal'
import api from '../../api/api'
import { toast } from 'react-toastify'
import Footer from '../../components/Footer/Footer';

export default function MyCart() {

    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    const [cartItems, setCartItems] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        async function loadCart() {
            await currentUser.cart.forEach((element) => {
                setCartItems((prev_products) => [...prev_products, element])
                setTotalPrice(state => state + (element.price * element.qty))
                setTotalItems(state => state + element.qty)
            })
        }

        loadCart()
    }, [])


    async function handleBuy() {
        await cartItems.forEach((element) => {
            element.date = new Date()
        })

        await api.post('/purchase/buy', { user_id: currentUser._id, updatedList: cartItems, buyByCart: true })
            .then((res) => {
                toast.success(res.data)
                dispatch({ type: 'UPDATE_USER', payload: { cart: [], purchases: [...currentUser.purchases, ...cartItems] } })
                setCartItems([])
                setShowModal(false)
            })
            .catch((error) => toast.error(error.response.data))
    }


    async function changeProductQty(id, qty) {
        let updated_cart = []

        await cartItems.forEach((element) => {
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
            .then()
            .catch((error) => toast.error(error.response.data))
        }


    //chamo essa função aqui porém ela é realizada no componente filho (CartItem) para atualizar a lista
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
            .catch((error) => toast.error(error.response.data))
        }


    if (isAuthenticated) {

        return (
            <div>
                <Modal className={showModal ? 'active' : 'desactive'}>
                    <p className='product-info-page-modal-txt'>Você deseja realmente finalizar a compra?</p>
                    {cartItems.map((product, i) => {
                        return (
                            <div key={i} className='product-info-page-modal-product'>
                                <p><span>{product.qty}x</span> {product.name}</p>
                                <p>R$ {(product.qty * product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                            </div>
                        )
                    })}
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Valor Total: R$ {totalPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</div>
                    <div className='product-info-page-modal-btns'>
                        <button className='product-info-page-modal-btns-buy' onClick={handleBuy}>Comprar</button>
                        <button className='product-info-page-modal-btns-cancel' onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </Modal>
                
                <Nav />

                <GenericPage>

                    <div className="my-cart-list">


                        <h1 className='my-cart-title'>Meu Carrinho</h1>
                        {
                            cartItems.length > 0 ?
                                (cartItems.map((item, i) => {
                                    return (
                                        <CartItem
                                            key={i}
                                            product_type={item.type}
                                            name={item.name}
                                            price={item.price}
                                            image={item.img}
                                            stock={item.stock}
                                            qty={item.qty}
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

                                        <button onClick={() => setShowModal(true)}>Comprar</button>
                                    </div>
                                )

                                :

                                <></>
                        }

                    </div >

                </GenericPage>
                <Footer />
            </div>
        )

    }

    return (
        <Navigate to={'/login'} />
    )
}