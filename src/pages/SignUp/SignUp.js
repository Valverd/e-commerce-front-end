import { Link, useNavigate } from 'react-router-dom'
import GenericPage from '../GenericPage'
import api from '../../api/api'
import './SignUp.css'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function SignUp() {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSignUp(e) {
        e.preventDefault()
        await api.post('/user/signUp', {name, address, email, password})
            .then((data) => {
                console.log(data)
                toast.success('Cadastrado com sucesso!')
                navigate('/login')
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
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
                                <input type='text' onChange={(e) => {setName(e.target.value)}}/>
                                <label>
                                    Endereço
                                </label>
                                <input type='text' onChange={(e) => {setAddress(e.target.value)}}/>
                                <label>

                                    Email
                                </label>
                                <input type='text' onChange={(e) => {setEmail(e.target.value)}}/>
                                <label>
                                    Senha
                                </label>
                                <input type='password' onChange={(e) => {setPassword(e.target.value)}}/>
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