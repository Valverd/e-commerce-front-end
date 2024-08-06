export default function GenericPage({ children }) {
    return (
        <div
            style={
                { 
                    maxWidth: 1400, margin: 'auto',
                    padding: '0 20px',
                }}
        >
            {children}
        </div>
    )
}