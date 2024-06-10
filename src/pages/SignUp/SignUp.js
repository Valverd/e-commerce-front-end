import { Link, useNavigate } from 'react-router-dom'
import GenericPage from '../GenericPage'
import './SignUp.css'

export default function SignUp() {

    const navigate = useNavigate()

    function handleSignUp(e) {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div>

            <div className='signUp'>
                <GenericPage>

                    <div className='signUp-container'>
                        <form className='signUp-form'>
                            <h1>Cadastra-se</h1>
                            <div className='signUp-form-inputs'>
                                <label>
                                    Nome
                                </label>
                                <input type='text' />
                                <label>
                                    Email
                                </label>
                                <input type='text' />
                                <label>
                                    Senha
                                </label>
                                <input type='password' />
                            </div>
                            <button onClick={handleSignUp}>Cadastrar</button>
                            <div className='signUp-form-links'>
                                <Link to={'/'} className='signUp-form-link'>Voltar ao Início</Link>
                                <p>Ja é cadastrado?<Link to={'/login'} className='signUp-form-link'> Entrar</Link></p>
                            </div>
                        </form>
                    </div>

                </GenericPage>
            </div>

        </div>
    )
}