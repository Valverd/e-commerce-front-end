import './ProductItem.css'
import { motion } from 'framer-motion'

export default function ProductItem({item, i, type}) {

    return (
            <motion.div
                className='product-item'
            >
                <div className='product-item-container'>
                    <img src={item.img} />
                    <div className='product-item-description'>
                        <h1>{item.name} {item.id}</h1>
                        <p><span>R$</span>100,00</p>
                    </div>
                </div>
            </motion.div>
    )
}