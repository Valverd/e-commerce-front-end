import './Carousel.css'
import { motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductItem from '../ProductItem/ProductItem'

export default function Carousel({ items, type }) {

    const [filterItems, setFilteritems] = useState([])
    const [width, setWidth] = useState(0)
    const carousel = useRef()
    const [startPos, setStartPos] = useState(0);
    const [endPos, setEndPos] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        setFilteritems(items.filter(item => item.type === type))
    }, [])

    //o useLayoutEffect ajuda a fazer com que o scrollWidth e offSetWidth sejam processados após todos os componentes de filterItems sejam renderizados 
    useLayoutEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [filterItems])

    // as funções de dragstart e dragend servem para capturar onde o produto esta localizado no eixo x
    // caso passem de 5 ele não é considerado um clique e não ativa o navigate do handleclick
    // assim eu seto como zerado no dragend toda vez que soltar o drag no mouse para estar zerado quando for clicar no item

    const handleDragStart = (event, info) => {
        setStartPos(info.point.x);
    };

    const handleDragEnd = (event, info) => {
        setEndPos(info.point.x);
        if (Math.abs(startPos - endPos) > 5) {
            setStartPos(0)
            setEndPos(0)
        }
    };

    const handleClick = (id) => {
        if (Math.abs(startPos - endPos) < 5) {
            navigate(`/${type}/${id}`);
        }
    };


    if (filterItems) {
        return (

            <div className='carousel'>
                <Link className='carousel-title' to={`/${type}`}>
                    <h1>{type}</h1>
                </Link>

                <motion.div
                    ref={carousel} className="carousel-container"
                >

                    <motion.div
                        className='carousel-list'
                        drag='x'
                        dragConstraints={{ right: 0, left: -width + 200 }}
                        initial={{ x: 200 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.7 }}
                        whileTap={{ cursor: 'grabbing' }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        {
                            filterItems.map((item, i) => {
                                return (
                                    <div key={i} onClick={() => handleClick(item._id)}>
                                        <ProductItem key={i} item={item} onClick={() => handleClick(item)} />
                                    </div>
                                )
                            })
                        }

                    </motion.div>

                </motion.div>

            </div>

        )
    }

}