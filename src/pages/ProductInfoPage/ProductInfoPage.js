import './ProductInfoPage.css'
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import { products } from "../../api/products";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


export default function ProductInfoPage() {

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    const type = useParams().products
    const IDproduct = useParams().id
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = months[currentDate.getMonth()]
    const year = currentDate.getFullYear()

    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)


    useEffect(() => {
        async function getProduct() {
            await setProduct(products.filter((products) => products.type === type)[0].items[IDproduct - 1])
            setLoading(false)

        }

        async function dateProduct() {
            const updateDate = `${day} de ${month} de ${year}`;
            await setProduct(state => {
                return { ...state, date: updateDate };
            });
        }


        getProduct()
        dateProduct()

    }, [])

    function handleAddCart() {
        if (isAuthenticated) {
            currentUser.my_cart.push(product)
            console.log(product)
            toast.success('Produto Adicionado ao Carrinho')
        } else {
            toast.error('Você precisa estar logado!')
        }

    }

    async function handleBuy() {
        if (isAuthenticated) {
            currentUser.my_purchases.push(product);
            toast.success('Compra Realizada');
        } else {
            toast.error('Você precisa estar logado!');
        }
    }


    if (!loading) {
        return (
            <div>
                <Nav />
                <GenericPage>
                    <div className="product-info-page">
                        <div className="product-info-page-img">
                            <img src={product.img} />
                        </div>
                        <div className="product-info-page-info">

                            <h1>{`${product.name} ${product.id}`}</h1>
                            <div className='product-info-page-info-description'>
                                Lorem ipsum molestie suscipit vivamus imperdiet neque nibh a, platea lacinia velit eu maecenas netus amet sodales, iaculis ipsum eleifend elit euismod elementum sodales. dui massa tellus velit rutrum vestibulum nisi nunc class tempor, himenaeos posuere tellus nisl facilisis nam morbi tempus rhoncus augue elementum, cras porta litora nulla enim pulvinar lobortis sapien iaculis ligula accumsan.
                            </div>
                            <div className='product-info-page-info-price'>
                                <p><span>R$</span> 100,00</p>
                            </div>
                            <div className='product-info-page-info-btns'>
                                <button className='product-info-page-info-buy' onClick={handleBuy}>Comprar</button>
                                <button className='product-info-page-info-addcart' onClick={handleAddCart}>Adicionar ao Carrinho</button>
                            </div>

                        </div>
                    </div>
                </GenericPage>
            </div>
        )
    }
}