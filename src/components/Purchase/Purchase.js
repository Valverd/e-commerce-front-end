import './Purchase.css'
import shape from '../../assets/shape.jpeg'

export default function Purchase() {
    return (
        <div className="purchase">
            <div className='purchase-info'>
                <img src={shape} width={100} />
                <div className='purchase-description'>
                    <h1>Objeto</h1>
                    <div>
                        <p className='purchase-description-price'><span>R$</span>100,00</p>
                        <p>26 de Março de 2024</p>
                    </div>
                </div>
            </div>

            <button>Ver Produto</button>
        </div>
    )
}