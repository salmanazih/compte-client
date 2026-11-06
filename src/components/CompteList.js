
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList({ reloadKey, onCompteSupprime }) {
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);

        axios.get(`${API_BASE_URL}/comptes`)
            .then(response => {
                setComptes(response.data);
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError("Impossible de récupérer les comptes.");
            })
            .finally(() => setLoading(false));
    }, [reloadKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/comptes/${id}`);
            alert("Compte supprimé avec succès !");
            onCompteSupprime();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression.");
        }
    };

    if (loading) {
        return <p className="text-center mt-4">Chargement...</p>;
    }

    return (
        <div className="card shadow-sm border-0 p-4">
            <h4 className="mb-4">Liste des comptes bancaires</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Solde</th>
                            <th>Date de création</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {comptes.length > 0 ? (
                            comptes.map(compte => (
                                <tr key={compte.id}>
                                    <td>{compte.id}</td>
                                    <td>{compte.solde} DH</td>
                                    <td>{compte.dateCreation}</td>
                                    <td>{compte.type}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(compte.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Aucun compte disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-muted mb-0">
                Nombre total de comptes : {comptes.length}
            </p>
        </div>
    );
}

export default CompteList;
