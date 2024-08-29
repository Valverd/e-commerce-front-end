import './GenericPage.css'

export default function GenericPage({ children }) {
    return (
        <div className='generic-page'>
            {children}
        </div>
    )
}