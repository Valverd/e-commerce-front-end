import { FiGithub, FiHeart, FiLinkedin } from 'react-icons/fi'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer(){
    return(
        <div className="footer">
            <p>Powered by Renan <FiHeart size={20} /></p>
            <div className='footer-links'>
                <Link className='footer-link' to={'https://github.com/Valverd'} target='_blank'>
                    <FiGithub size={20}/>
                </Link>
                <Link className='footer-link' to={'https://www.linkedin.com/in/renan-valverde/'} target='_blank'>
                    <FiLinkedin size={20}/>
                </Link>
            </div>
        </div>
    )
}