import './ProductInfoPage.css'
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import { products } from "../../api/products";
import { useEffect, useState } from "react";


export default function ProductInfoPage() {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const type = useParams().products
    const IDproduct = useParams().id


    useEffect(() => {
        async function getProduct() {
            await setProduct(products.filter((products) => products.type === type)[0].items[IDproduct])
            setLoading(false)
            console.log(product)
        }

        getProduct()
    })


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

                            <h1>{`${product.name} ${(Number(IDproduct) + 1)}`}</h1>
                            <div className='product-info-page-info-description'>
                                Lorem ipsum molestie suscipit vivamus imperdiet neque nibh a, platea lacinia velit eu maecenas netus amet sodales, iaculis ipsum eleifend elit euismod elementum sodales. dui massa tellus velit rutrum vestibulum nisi nunc class tempor, himenaeos posuere tellus nisl facilisis nam morbi tempus rhoncus augue elementum, cras porta litora nulla enim pulvinar lobortis sapien iaculis ligula accumsan.
                            </div>
                            <div className='product-info-page-info-price'>
                                <p><span>R$</span> 100,00</p>
                            </div>
                            <div className='product-info-page-info-btns'>
                                <button className='product-info-page-info-buy'>Comprar</button>
                                <button className='product-info-page-info-addcart'>Adicionar ao Carrinho</button>
                            </div>

                        </div>
                    </div>
                </GenericPage>
            </div>
        )
    }
}