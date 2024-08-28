import './Nav.css'
import PrivateRoute from '../../auth/PrivateRoute'
import SideBar from '../SideBar/SideBar'
import avatar from '../../assets/usuario-em-branco.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu, FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'

export default function Nav() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    // const sideBarReducer = useSelector(rootReducer => rootReducer.sideBarReducer)
    const [showSideBar, setShowSideBar] = useState(false)

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

                        <FiMenu
                            size={25}
                            className={showSideBar ? 'desactive' : 'sidebar-menu'}
                            onClick={() => setShowSideBar(true)}
                        />

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

                <SideBar
                    showSideBar={showSideBar}
                    setShowSideBar={() => setShowSideBar(false)}
                />
            </PrivateRoute>
        )

    }

    return (
        <div>
            <nav className="nav">
                <div className='nav-container'>

                    <Link to={'/'} className='nav-link'>
                        <h1>SkateMidia</h1>
                    </Link>

                    <div className='nav-links'>
                        <Link to={'/login'} className='nav-link'>
                            <p>Entrar</p>
                        </Link>
                        <Link to={'/signUp'} className='nav-link'>
                            <p>Cadastrar-se</p>
                        </Link>
                    </div>

                    <FiMenu
                        size={25}
                        className={showSideBar ? 'desactive' : 'sidebar-menu'}
                        onClick={() => setShowSideBar(true)}
                    />

                </div>

            </nav>

            <SideBar
                showSideBar={showSideBar}
                setShowSideBar={() => setShowSideBar(false)}
            />
        </div>
    )

}