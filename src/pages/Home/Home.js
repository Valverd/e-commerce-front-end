import Carousel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import { products } from '../../api/products'
import GenericPage from '../GenericPage';

export default function Home() {

    return (
        <div>
            <Nav />
            <GenericPage>
                {
                    products.map((list, i) => {
                        return(
                            <Carousel items={list.items} type={list.type} key={i} />
                        )
                    })
                }
            </GenericPage>
        </div>
    )
}