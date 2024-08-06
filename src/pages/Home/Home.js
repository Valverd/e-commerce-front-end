import Carousel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import GenericPage from '../GenericPage';
import api from '../../api/api'
import { useEffect, useState } from "react";

export default function Home() {

    const [types, setTypes] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            await api.get('/products')
                .then((res) => {
                    let types_filter = []
                    res.data.map(element => {
                        types_filter.push(element.type)
                        setProducts(prevList => [...prevList, element])
                    })
                    // ao add no types_filter os tipos de todos os produtos, eu tiro todos os nomes repetidos, pra pegar tipos de produtos que existem
                    setTypes(types_filter.filter((type, i) => types_filter.indexOf(type) === i))
                })
                .catch(error => console.log(error))
        }

        getProducts()

    }, [])

    return (
        <div>
            <Nav />
            <GenericPage>
                {

                    types && products && types.map((type, i) => {
                        return (
                            <Carousel items={products} type={type} key={i}/>
                        )
                    })
                }
            </GenericPage>
        </div>
    )
}