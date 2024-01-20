import React from 'react'
import './NotFound.css'
import Navbar from "../../composants/Navbar/Navbar"
import ReactLoading from 'react-loading';
export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className='not-found'>

                <div className="not-found-container">
                    <div className="not-found-content">
                        <h1>Erreur 404</h1>
                        <p>La page recherchée  n'existe pas.</p>
                        <p>Retournez à la <a href="/">page d'accueil</a>.</p>
                        <ReactLoading type={"spin"} color={"#9D2026"} height={150} width={100} />

                    </div>
                </div>
            </div>
        </>
    );
}
