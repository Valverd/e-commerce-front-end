import { Link } from 'react-router-dom'
import './Nav.css'
import { useState } from 'react'

export default function Nav() {

    const [logged, setLogged] = useState(true)

    if (logged) {

        return (
            <nav className="nav">
                <div className='nav-container'>
                    <Link to={'/'} className='nav-link'>
                        <h1>SkateMidia</h1>
                    </Link>
                    <div className="nav-links">
                        <Link to={'/'} className='nav-link'>
                            <p>Início</p>
                        </Link>
                        <Link to={'/profile'} className='nav-link'>
                            <p>Meu Perfil</p>
                        </Link>
                        <Link to={'/'} className='nav-link'>
                            <p>Sair</p>
                        </Link>
                    </div>
                </div>
            </nav>
        )

    }

    return (
        <nav className="nav">
            <div className='nav-container'>
                <Link to={'/'} className='nav-link'>
                    <h1>SkateMidia</h1>
                </Link>
                <div className="nav-links">
                    <Link to={'/'} className='nav-link'>
                        <p>Início</p>
                    </Link>
                    <Link to={'/login'} className='nav-link'>
                        <p>Entrar</p>
                    </Link>
                    <Link to={'/signUp'} className='nav-link'>
                        <p>Cadastrar-se</p>
                    </Link>
                </div>
            </div>
        </nav>
    )

}