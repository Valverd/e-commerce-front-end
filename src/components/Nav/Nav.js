import './Nav.css'
import avatar from '../../assets/usuario-em-branco.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'
import PrivateRoute from '../../auth/PrivateRoute'

export default function Nav() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    function handleLogout() {
        navigate('/')
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER' })
    }

    if (isAuthenticated) {
        return (
            <PrivateRoute>
                <nav className="nav">
                    <div className='nav-container'>
                        <Link to={'/'} className='nav-link'>
                            <h1>SkateMidia</h1>
                        </Link>
                        <div className="nav-links">
                            <Link to={'/profile'} className='nav-link' >
                                {
                                    currentUser.profileImg ?
                                        <img
                                            src={currentUser.profileImg}
                                            alt="Foto de Perfil"
                                            className='nav-img'
                                        />
                                        :
                                        <img
                                            src={avatar}
                                            alt="Foto de Perfil"
                                            className='nav-img'
                                        />
                                }
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
            </PrivateRoute>
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