// App.jsx - Application complète avec Connexion, Inscription (Date de Naissance) et Entraînement
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Composants simplifiés pour PlayCode.io
const Card = ({ children }) => <div className="p-4 border rounded-lg mb-4">{children}</div>;
const CardContent = ({ children }) => <div className="p-2">{children}</div>;
const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
    {children}
  </button>
);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, birthdate })
      });

      if (response.ok) {
        alert('Un email de confirmation vous a été envoyé.');
        setUser({ email, birthdate });
      } else {
        alert("Erreur lors de l'inscription.");
      }
    } catch (error) {
      alert('Erreur de connexion avec le serveur.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        alert('Identifiants incorrects');
      }
    } catch (error) {
      alert('Erreur de connexion avec le serveur.');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Inscription' : 'Connexion'}</h1>
        <Card>
          <CardContent>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded mb-2" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="p-2 border rounded mb-2" />
            {isRegistering && <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="p-2 border rounded mb-2" />}
            <Button onClick={isRegistering ? handleRegister : handleLogin}>{isRegistering ? "S'inscrire" : "Se connecter"}</Button>
            <p className="mt-2 text-sm cursor-pointer text-blue-500" onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Application Entraînement Sportifs</h1>
      <p>Connecté en tant que : {user.email} (Date de Naissance : {user.birthdate || 'N/A'}) <Button onClick={handleLogout}>Se déconnecter</Button></p>
      <Card className="mb-4">
        <CardContent>
          <input type="number" placeholder="Durée (min)" className="p-2 border rounded mb-2" />
          <input type="number" placeholder="Intensité (0-10)" className="p-2 border rounded mb-2" />
          <Button>Ajouter Entraînement</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Configuration de l'application sur PlayCode.io
const root = document.getElementById('root');
if (root) ReactDOM.createRoot(root).render(<App />);
