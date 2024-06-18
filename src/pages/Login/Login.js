import { Link, useNavigate } from 'react-router-dom'
import GenericPage from '../GenericPage'
import './Login.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogin(e) {
        e.preventDefault()

        if (email === 'teste@teste.com' && password === '123123') {
            dispatch({ type: 'LOGIN_USER', payload: { name: 'Renan', email: email, my_cart: [], my_purchases: [] } })
            navigate('/')
        } else{
            setEmail('')
            setPassword('')
            alert('Email ou Senha devem estar incorretos.')
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
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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