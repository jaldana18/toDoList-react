import React from 'react';


const Footer = () => {
    return (
        <footer className="footer text-center">
            <div className="container">
                <p className="text-muted">
                     {new Date().getFullYear()} - Prueba  tecnica Juan Danilo Aldana Tibabisco. 
                </p>
            </div>
        </footer>
    );
};

export default Footer;