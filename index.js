// index.js - Serveur API Node.js pour Entraînement Sportifs
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

// Configurer Nodemailer avec les variables d'environnement
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route de test pour vérifier l'API
app.get('/', (req, res) => {
  res.send('API Entraînement Sportifs fonctionne !');
});

// Route d'inscription avec envoi d'email
app.post('/register', async (req, res) => {
  const { email } = req.body;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation d'inscription",
      text: "Merci de vous être inscrit sur l'Application Entraînement Sportifs !"
    });

    res.status(200).json({ message: 'Email de confirmation envoyé !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l'envoi de l'email.' });
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
