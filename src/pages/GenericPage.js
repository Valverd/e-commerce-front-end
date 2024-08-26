import './GenericPage.css'
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GenericPage({ children }) {
    const sideBarReducer = useSelector(rootReducer => rootReducer.sideBarReducer)

    useEffect(() => {
        if (sideBarReducer) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
      }, [sideBarReducer]);
    

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