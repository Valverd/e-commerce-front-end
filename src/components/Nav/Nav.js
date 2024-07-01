import { Link } from 'react-router-dom'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'

export default function Nav() {

    const dispatch = useDispatch()
    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)

    function handleLogout() {
        window.location.reload()
        dispatch({ type: 'LOGOUT_USER' })
    }

    if (isAuthenticated) {

        return (
            <nav className="nav">
                <div className='nav-container'>
                    <Link to={'/'} className='nav-link'>
                        <h1>SkateMidia</h1>
                    </Link>
                    <div className="nav-links">
                        <Link to={'/profile'} className='nav-link' >
                            <p>Meu Perfil</p>
                        </Link>
                        <Link to={'/my-cart'} className='nav-link' title='Meu Carrinho'>
                            <FiShoppingCart size={20} className='nav-link-icon' />
                        </Link>
                        <Link
                            to={'/'}
                            className='nav-link'
                            onClick={handleLogout}
                        >
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