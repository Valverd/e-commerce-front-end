import './Profile.css'
import { useState } from "react";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import avatar from '../../assets/usuario-em-branco.png'
import { FiUpload } from "react-icons/fi";
import Purchase from '../../components/Purchase/Purchase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Profile() {

    const [avatarURL, setAvatarURL] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()

    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)


    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setAvatarURL(URL.createObjectURL(image))
            } else {
                alert('Arquivo não suportado')
            }
        }
    }

    function handleClick(e) {
        e.preventDefault()
    }

    if (isAuthenticated) {
        return (
            <div>
                <Nav />
                <GenericPage>

                    <div className="profile">

                        <h1 className='profile-title'>Meu Perfil</h1>

                        <form>

                            <div className="profile-form">
                                <label className="profile-form-avatar">
                                    <span className={`${isHover ? 'profile-form-avatar-hover' : ''}`}>
                                        <FiUpload
                                            color="#fff"
                                            size={25}
                                        />
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFile}
                                    />
                                    {
                                        avatarURL === null ?
                                            (<img
                                                src={avatar}
                                                alt="Foto de Perfil"
                                                width={300}
                                                height={300}
                                                onMouseEnter={() => setIsHover(true)}
                                                onMouseLeave={() => setIsHover(false)}
                                            />)
                                            :
                                            (<img
                                                src={avatarURL}
                                                alt="Foto de Perfil"
                                                width={300}
                                                height={300}
                                                onMouseEnter={() => setIsHover(true)}
                                                onMouseLeave={() => setIsHover(false)}
                                            />)
                                    }
                                </label>
                                <div className='profile-form-info'>
                                    <input defaultValue={'Renan Valverde Garcia Martins'} />
                                    <input defaultValue={'renanvgmartins@hotmail.com'} />
                                    <input defaultValue={'Rua Paulo Elias Pecorari, 112 - 13420668'} />
                                </div>
                            </div>

                            <button className='profile-form-btn' onClick={handleClick}>Salvar Perfil</button>

                        </form>

                        <div className='profile-purchases'>
                            <h1 className='profile-purchases-title'>Minhas Compras</h1>
                            {
                                currentUser.my_purchases.map((item, i) => {
                                    return (
                                        <Purchase
                                            key={i}
                                            type={'purchase'}
                                            name={item.name}
                                            price={item.price}
                                            image={item.img}
                                            id={item.id}
                                            date={item.date}
                                        />
                                    )

                                })
                            }
                        </div>

                    </div>

                </GenericPage>
            </div>
        )

    }

    return (
        <Navigate to={'/login'} />
    )
}