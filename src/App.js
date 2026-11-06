
import React, { useState } from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
    const [reloadKey, setReloadKey] = useState(0);

    const handleRefresh = () => {
        setReloadKey(prev => prev + 1);
    };

    return (
        <div className="app-container">
            <nav className="navbar navbar-dark bg-primary shadow-sm">
                <div className="container">
                    <span className="navbar-brand fw-bold">
                        Banque REST
                    </span>
                    <span className="text-white">
                        Gestion des comptes
                    </span>
                </div>
            </nav>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold">
                        Gestion des comptes bancaires
                    </h1>
                    <p className="text-muted">
                        Ajouter, consulter et supprimer vos comptes.
                    </p>
                </div>

                <CompteForm
                    onCompteAjoute={handleRefresh}
                />

                <CompteList
                    reloadKey={reloadKey}
                    onCompteSupprime={handleRefresh}
                />
            </div>

            <footer className="text-center py-4 text-muted">
                Banque REST - Spring Boot & React
            </footer>
        </div>
    );
}

export default App;
