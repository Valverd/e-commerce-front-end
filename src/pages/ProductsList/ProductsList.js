import './ProductsList.css'
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import { products } from "../../api/products";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useEffect, useState } from "react";
import GenericPage from '../GenericPage';

export default function ProductsList() {

    const type = useParams().products
    const [wichProduct, setWichProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function filterProducts() {
            await setWichProduct(products.filter((products) => products.type === type)[0].items)
        }

        filterProducts()
        setLoading(false)

    }, [])


    if (!loading) {
        return (
            <div>
                <Nav />

                <GenericPage>
                    <h1>{type}</h1>
                    <div className='products-list'>
                        {
                            wichProduct.map((item, i) => {
                                return (
                                    <Link
                                        to={`/${type}/${i}`}
                                        key={i}
                                        className='product-link'> 
                                    {/* a classe product-link fica localizado no ProductItem.css para generalizar em todos */}
                                        <ProductItem 
                                            item={item}
                                            i={i}
                                            type={type}
                                        />
                                    </Link>
                                )
                            })
                        }
                    </div>
                </GenericPage>

            </div>
        )
    }
}