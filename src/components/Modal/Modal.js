import './Modal.css'

export default function Modal({className, children}) {
    return(
        <div className={`modal ${className}`}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}