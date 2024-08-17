import './ProductItem.css'
import { motion } from 'framer-motion'

export default function ProductItem({item}) {

    return (
            <motion.div
                className='product-item'
            >
                <div className='product-item-container' id={item._id}>
                    <img alt='Imagem do Produto' src={item.img} />
                    <div className='product-item-description'>
                        <h1>{item.name}</h1>
                        <p><span>R$</span>{item.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                    </div>
                </div>
            </motion.div>
    )
}