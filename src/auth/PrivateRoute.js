import { useEffect, useState } from "react"
import api from "../api/api"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'))

        // ao pegar o token armazenado no localStorage, verifico se existe um, caso existe, verifico a integridade, caso não, deslogo

        async function getToken() {
            if (token) {
                api.defaults.headers.common['authorization'] = token
                await api.get('/token')
                    .then((data) => {
                        setLoading(false)
                        console.log(data)
                    })
                    .catch(() => {
                        dispatch({ type: 'LOGOUT_USER' })
                    })
            } else {
                navigate('/login')
            }
        }

        getToken()
    }, [])



    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        isAuthenticated ? children : <Navigate to={'/login'}/>
    )
}