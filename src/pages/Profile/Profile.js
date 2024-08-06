import './Profile.css'
import { useState } from "react";
import Nav from "../../components/Nav/Nav";
import GenericPage from "../GenericPage";
import avatar from '../../assets/usuario-em-branco.png'
import { FiUpload } from "react-icons/fi";
import Purchase from '../../components/Purchase/Purchase';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

export default function Profile() {

    const { currentUser, isAuthenticated } = useSelector(rootReducer => rootReducer.userReducer)

    const [isHover, setIsHover] = useState(false)
    const [name, setName] = useState(currentUser.name)
    const [address, setAddress] = useState(currentUser.address)
    const [profileImg, setProfileImg] = useState(currentUser.profileImg)
    //sendProfileImg serve para mandar para o back sem ser o URL.createObjetURL
    const [sendProfileImg, setSendProfileImg] = useState(null)

    const dispatch = useDispatch()


    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setSendProfileImg(image)
                setProfileImg(URL.createObjectURL(image))
            } else {
                alert('Arquivo não suportado')
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formaData = new FormData()
        formaData.append('id', currentUser._id)
        formaData.append('name', name)
        formaData.append('address', address)
        formaData.append('profileImg', sendProfileImg)

        await api.post('/user/update', formaData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                toast.success(res.data)
                dispatch({ type: 'UPDATE_USER', payload: { name, address, profileImg } })
            })
            .catch((error) => console.log(error))
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
                                        profileImg ?
                                            (<img
                                                src={profileImg}
                                                alt="Foto de Perfil"
                                                width={300}
                                                height={300}
                                                onMouseEnter={() => setIsHover(true)}
                                                onMouseLeave={() => setIsHover(false)}
                                            />)
                                            :
                                            (<img
                                                src={avatar}
                                                alt="Foto de Perfil"
                                                width={300}
                                                height={300}
                                                onMouseEnter={() => setIsHover(true)}
                                                onMouseLeave={() => setIsHover(false)}
                                            />)
                                    }
                                </label>
                                <div className='profile-form-info'>
                                    <input value={name} onChange={(e) => setName(e.target.value)} />
                                    <input value={currentUser.email} disabled />
                                    <input value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>

                            <button className='profile-form-btn' onClick={handleSubmit}>Salvar Perfil</button>

                        </form>

                        <div className='profile-purchases'>
                            <h1 className='profile-purchases-title'>Minhas Compras</h1>
                            {
                                currentUser.purchases.map((item, i) => {
                                    console.log(item)
                                    return (
                                        <Purchase
                                            key={i}
                                            type={'purchase'}
                                            name={item.name}
                                            price={item.price}
                                            image={item.img}
                                            id={item._id}
                                            qty={item.qty}
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