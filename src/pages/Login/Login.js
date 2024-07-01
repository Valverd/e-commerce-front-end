import { Link, useNavigate } from 'react-router-dom'
import GenericPage from '../GenericPage'
import './Login.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import api from '../../api/api'
import { toast } from 'react-toastify'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            await api.post('/user/login', {
                email,
                password
            })
                .then((user) => {
                    dispatch({type: 'LOGIN_USER', payload: user.data})
                    localStorage.setItem('token', JSON.stringify(user.data.token))
                    navigate('/')
                })
                .catch((error) => {
                    toast.error(error.response.data)
                    console.log(error)
                })
        } catch (error) {
            toast("Erro! Tente novamente...")
        }

    }

    return (
        <div>

            <div className='login'>
                <GenericPage>

                    <div className='login-container'>
                        <form className='login-form'>
                            <h1>Login</h1>
                            <div className='login-form-inputs'>
                                <label>
                                    Email
                                </label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>
                                    Senha
                                </label>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button onClick={handleLogin}>Entrar</button>
                            <div className='login-form-links'>
                                <Link to={'/'} className='login-form-link'>Voltar ao Início</Link>
                                <p>É novo por aqui?<Link to={'/signUp'} className='login-form-link'> Cadastrar-se</Link></p>
                            </div>
                        </form>
                    </div>

                </GenericPage>
            </div>

        </div>
    )
}