import './Purchase.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


//vou ter que dividir cart item e purchase em diferentes arquivos

export default function Purchase({ product_type, name, price, image, id, qty, date }) {

    const { currentUser } = useSelector(rootReducer => rootReducer.userReducer)
    const navigate = useNavigate()

    const optionsHora = {
        hour: '2-digit',
        minute: '2-digit'
    };

    const optionsData = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };


    function showProduct() {
        navigate(`/${product_type}/${id}`)
    }


    return (
        <div className="purchase">
            <div className='purchase-info'>
                <img src={image} width={100} />
                <div className='purchase-description'>
                    <h1>{name}</h1>
                    <div className='purchase-description-infos'>
                        <p className='purchase-description-price'><span>R$ </span>{(price * qty).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                        <p>Quantidade: {qty}</p>
                        <p>Preço: R$ {price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        <p>{new Date(date).toLocaleTimeString('pt-BR', optionsHora) + ', ' + new Date(date).toLocaleDateString('pt-BR', optionsData)}</p>
                    </div>
                </div>
            </div>

            <button className='purchase-btn-show' onClick={showProduct}>Ver Produto</button>
        </div>
    )

}