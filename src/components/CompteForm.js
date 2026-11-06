
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteAjoute, compteAModifier, onAnnuler }) {

    const [compte, setCompte] = useState({
        solde: '',
        dateCreation: '',
        type: 'COURANT'
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (compteAModifier) {
            setCompte({
                solde: compteAModifier.solde,
                dateCreation: compteAModifier.dateCreation?.substring(0, 10),
                type: compteAModifier.type
            });
        } else {
            setCompte({
                solde: '',
                dateCreation: '',
                type: 'COURANT'
            });
        }

        setMessage('');
        setError('');
    }, [compteAModifier]);

    const handleChange = (e) => {
        setCompte({
            ...compte,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        setLoading(true);

        try {
            const data = {
                ...compte,
                solde: Number(compte.solde)
            };

            if (compteAModifier) {
                await axios.put(
                    `${API_BASE_URL}/comptes/${compteAModifier.id}`,
                    data
                );

                setMessage('Compte modifié avec succès !');
            } else {
                await axios.post(`${API_BASE_URL}/comptes`, data);

                setMessage('Compte ajouté avec succès !');
            }

            setCompte({
                solde: '',
                dateCreation: '',
                type: 'COURANT'
            });

            onCompteAjoute();

        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'opération.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setCompte({
            solde: '',
            dateCreation: '',
            type: 'COURANT'
        });

        setMessage('');
        setError('');
        onAnnuler();
    };

    return (
        <div className="card shadow-sm border-0 p-4 mb-4">

            <h4 className="mb-4">
                {compteAModifier ? 'Modifier un compte' : 'Ajouter un compte'}
            </h4>

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Solde (DH)</label>

                    <input
                        type="number"
                        name="solde"
                        className="form-control"
                        value={compte.solde}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Date de création
                    </label>

                    <input
                        type="date"
                        name="dateCreation"
                        className="form-control"
                        value={compte.dateCreation || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Type de compte</label>

                    <select
                        name="type"
                        className="form-select"
                        value={compte.type}
                        onChange={handleChange}
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={loading}
                >
                    {loading
                        ? 'Enregistrement...'
                        : compteAModifier
                            ? 'Enregistrer les modifications'
                            : 'Ajouter le compte'}
                </button>

                {compteAModifier && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                )}

            </form>
        </div>
    );
}

export default CompteForm;
