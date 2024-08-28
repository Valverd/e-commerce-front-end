import './ProductInfoPage.css'
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import api from '../../api/api';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal/Modal';

export default function ProductInfoPage() {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const id = useParams().id
    const select_qty = useRef()


    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getProduct() {
            await api.post('/products/id', { id })
                .then((res) => {
                    res.data.qty = 1
                    setProduct(res.data)
                })
                .catch((error) => toast.error(error.response.data))
            setLoading(false)
        }

        getProduct()
    }, [])


    async function handleAddCart() {
        if (isAuthenticated) {
            if (product.stock < 1) {
                return toast.error('Produto sem estoque!')
            }
            await api.post('/purchase/addCart', { user_id: currentUser._id, product })
                .then((res) => {
                    dispatch({ type: 'UPDATE_USER', payload: { cart: [...currentUser.cart, product] } })
                    toast.success(res.data)
                })
                .catch((error) => toast.error(error.response.data))
        } else {
            toast.error('Você precisa estar logado!')
        }
    }

    async function handleBuy() {
        if (isAuthenticated) {
            if (product.stock < 1) {
                return toast.error('Produto sem estoque!')
            }

            product.date = new Date()


            await api.post('/purchase/buy', { user_id: currentUser._id, updatedList: [product], buyByCart: false })
                .then(async (res) => {
                    toast.success(res.data)
                    setShowModal(false)
                    dispatch({ type: 'UPDATE_USER', payload: { purchases: [...currentUser.purchases, product] } })

                    // aqui é verificado se o produto que acabei de comprar existe no carrinho, para assim atualizar o valor de estoque dele
                    let newCart = []
                    await currentUser.cart.map((element) => {
                        if (element._id === product._id) {
                            element.stock = element.stock - product.qty
                            if (element.qty > element.stock) {
                                element.qty = element.stock
                            }

                            newCart.push(element)
                        } else {
                            newCart.push(element)
                        }
                    })
                    dispatch({ type: 'UPDATE_USER', payload: { cart: newCart } })
                    await api.post('/purchase/updateCart', { user_id: currentUser._id, newCart })
                        .then()
                        .catch((error) => toast.error(error.response.data))


                    // aqui eu seto o product para o novo valor para atualizar o valor do campo <p> de 'Disponíveis'
                    setProduct((prevProduct) => ({
                        ...prevProduct,
                        stock: prevProduct.stock - prevProduct.qty,
                        qty: 1
                    }));

                    select_qty.current.value = 1
                })
                .catch((error) => toast.error(error.response.data))

        } else {
            toast.error('Você precisa estar logado!');
        }
    }


    if (!loading) {
        return (
            <div>
                <Modal className={showModal ? 'active' : 'desactive'}>
                    <p className='product-info-page-modal-txt'>Você deseja realmente finalizar a compra?</p>
                    <div className='product-info-page-modal-product'>
                        <p><span>{product.qty}x</span> {product.name}</p>
                        <p>R$ {(product.qty * product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className='product-info-page-modal-btns'>
                        <button className='product-info-page-modal-btns-buy' onClick={handleBuy}>Comprar</button>
                        <button className='product-info-page-modal-btns-cancel' onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </Modal>
                <Nav />
                <GenericPage>
                    <div className="product-info-page">
                        <div className="product-info-page-img">
                            <img src={product.img} />
                        </div>
                        <div className="product-info-page-info">

                            <h1>{`${product.name}`}</h1>
                            <div className='product-info-page-info-description'>
                                Lorem ipsum molestie suscipit vivamus imperdiet neque nibh a, platea lacinia velit eu maecenas netus amet sodales, iaculis ipsum eleifend elit euismod elementum sodales. dui massa tellus velit rutrum vestibulum nisi nunc class tempor, himenaeos posuere tellus nisl facilisis nam morbi tempus rhoncus augue elementum, cras porta litora nulla enim pulvinar lobortis sapien iaculis ligula accumsan.
                            </div>
                            <div className='product-info-page-info-price'>
                                <p><span>R$</span> {product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className='product-info-page-info-stock'>
                                <div className='product-info-page-info-stock-qty'>
                                    <p>Disponíveis: {product.stock}</p>
                                </div>
                                <div className='product-info-page-info-qty'>
                                    <p>Quantidade:</p>
                                    <select
                                        ref={select_qty}
                                        onChange={(e) => {
                                            product.qty = parseInt(e.target.value)
                                        }}
                                    >
                                        {Array.from({ length: product.stock }, (_, index) => {
                                            return (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='product-info-page-info-btns'>
                                <button className='product-info-page-info-buy' onClick={() => setShowModal(true)}>Comprar</button>
                                <button className='product-info-page-info-addcart' onClick={handleAddCart}>Adicionar ao Carrinho</button>
                            </div>

                        </div>
                    </div>
                </GenericPage>
            </div>
        )
    }
}