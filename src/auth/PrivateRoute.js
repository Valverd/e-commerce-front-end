import { useEffect, useState } from "react"
import api from "../api/api"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'

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
                await api.get('/token').then(() => {
                    setLoading(false)
                })
                    .catch(() => {
                        dispatch({ type: 'LOGOUT_USER' })
                        navigate('/')
                    })
            } else {
                navigate('/login')
                toast.error('Você deve fazer login para acessar esta área!')
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
        isAuthenticated ? children : <Navigate to={'/login'} />
    )
}