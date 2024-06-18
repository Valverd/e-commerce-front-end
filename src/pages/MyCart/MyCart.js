import { useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import MyCartList from '../../components/MyCartList/MyCartList';
import { Navigate } from "react-router-dom";

export default function MyCart() {

    const { isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)


    if (isAuthenticated) {

        return (
            <div>
                <Nav />

                <GenericPage>
                    <div className="my-cart">
                        <MyCartList />
                    </div>
                </GenericPage>
            </div>
        )

    }

    return (
        <Navigate to={'/login'} />
    )
}