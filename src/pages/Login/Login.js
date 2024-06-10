import { Link, useNavigate } from 'react-router-dom'
import GenericPage from '../GenericPage'
import './Login.css'

export default function Login() {

    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()
        navigate('/')
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
                                <input type='text' />
                                <label>
                                    Senha
                                </label>
                                <input type='password' />
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