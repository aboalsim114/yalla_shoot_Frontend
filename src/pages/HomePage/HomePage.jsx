import React from 'react';
import Navbar from '../../composants/Navbar/Navbar';
import './HomePageStyle.css';
import BG from "../../assets/BG.png";
import { Link } from 'react-router-dom';
export default function HomePage() {

    return (
        <>
            <Navbar />
            <div className="homePage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' }}></div>
                {/* <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)' }}></div> */}
                <div className="background" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img src={BG} alt="Basketball Player" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ zIndex: 2, textAlign: 'center' }}>
                    <div className="button-container" style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/login">
                            <button className="button login-button" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }}>Se connecter</button>
                        </Link>
                        <Link to="/register">
                            <button className="button signup-button" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }}>Créer un compte</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
