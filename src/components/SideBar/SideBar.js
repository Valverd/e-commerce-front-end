import './SideBar.css'
import avatar from '../../assets/usuario-em-branco.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiX } from 'react-icons/fi'
import PrivateRoute from '../../auth/PrivateRoute'

export default function SideBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)
    const sideBarReducer = useSelector(root => root.sideBarReducer)


    function handleLogout() {
        navigate('/')
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER' })
    }


    if (isAuthenticated) {

        return (
            <PrivateRoute>
                <div className={sideBarReducer ? 'sidebar visible' : 'sidebar'}>
                    <FiX
                        size={25}
                        className='sidebar-close'
                        onClick={() => {
                            dispatch({ type: 'HIDE_MENU' })
                        }}
                    />
                    <div className="sidebar-links">
                        <Link to={'/profile'} className='sidebar-link' >
                            {
                                currentUser.profileImg ?
                                    <img
                                        src={currentUser.profileImg}
                                        alt="Foto de Perfil"
                                        className='sidebar-img'
                                    />
                                    :
                                    <img
                                        src={avatar}
                                        alt="Foto de Perfil"
                                        className='sidebar-img'
                                    />
                            } Meu Perfil
                        </Link>
                        <Link to={'/my-cart'} className='sidebar-link' title='Meu Carrinho'>
                            <p>Meu Carrinho</p>
                        </Link>
                        <Link
                            to={'/'}
                            className='sidebar-link'
                            onClick={handleLogout}
                        >
                            <p>Sair</p>
                        </Link>
                    </div>

                </div>
            </PrivateRoute>
        )
    }

    return (
        <div className={sideBarReducer ? 'sidebar visible' : 'sidebar'}>
            <FiX
                size={25}
                className='sidebar-close'
                onClick={() => {
                    dispatch({ type: 'HIDE_MENU' })
                }}
            />

            <div className='sidebar-links'>
                <Link to={'/login'} className='sidebar-link'>
                    <p>Entrar</p>
                </Link>
                <Link to={'/signUp'} className='sidebar-link'>
                    <p>Cadastrar-se</p>
                </Link>
            </div>
        </div>
    )
}