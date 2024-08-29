import './Nav.css'
import PrivateRoute from '../../auth/PrivateRoute'
import SideBar from '../SideBar/SideBar'
import avatar from '../../assets/usuario-em-branco.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiLogOut, FiMenu, FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'

export default function Nav() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    const [showSideBar, setShowSideBar] = useState(false)

    function handleLogout() {
        if (location.pathname === '/') {
            window.location.reload()
        }
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
                            onClick={() => {
                                setShowSideBar(true)
                                document.body.classList.add("no-scroll");
                            }}
                        />

                        <div className="nav-links">
                            <Link to={'/profile'} className='nav-link' >
                                <div>
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
                                </div>
                                <p>Perfil</p>
                            </Link>
                            <Link to={'/my-cart'} className='nav-link' title='Meu Carrinho'>
                                <FiShoppingCart size={20} className='nav-link-icon' />
                                <p>Carrinho</p>
                            </Link>
                            <Link
                                to={'/'}
                                className='nav-link'
                                onClick={handleLogout}
                            >
                                <FiLogOut size={20} className='nav-link-icon' />
                                <p>Sair</p>
                            </Link>
                        </div>
                    </div>
                </nav>

                <SideBar
                    showSideBar={showSideBar}
                    setShowSideBar={() => {
                        setShowSideBar(false)
                        document.body.classList.remove("no-scroll");
                    }}
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
                        onClick={() => {
                            setShowSideBar(true)
                            document.body.classList.add("no-scroll");
                        }}
                    />

                </div>

            </nav>

            <SideBar
                showSideBar={showSideBar}
                setShowSideBar={() => {
                    setShowSideBar(false)
                    document.body.classList.remove("no-scroll");
                }}
            />
        </div>
    )

}