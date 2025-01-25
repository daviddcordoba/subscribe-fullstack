import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import transporter from './utils.js';
import db from './firebase-config.js';

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para enviar correos 
app.post("/", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
    } 

    try {
        const userRef = doc(db, 'subscribers', email); // Referencia al documento del usuario
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
            // Si el correo ya está registrado
            return res.status(500).json({ error: 'Este correo ya está suscrito.' });
        }
        // Si no está registrado, enviar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:email,
            subject: '¡Gracias por suscribirte!',
            text: 'Te has suscrito exitosamente a nuestras novedades.',
        };
        await transporter.sendMail(mailOptions);
    
        // Guardar el correo en la base de datos
        await setDoc(userRef, { email });
    
        return res.status(200).json({ message: 'Correo enviado y suscripción exitosa.' });
        } catch (error) {
            console.error('Error al suscribir:', error);
            return res.status(200).json({ success: false, message: 'Error al procesar la suscripción.' });
        }
});


app.get("/",async(req,res) => {
    try{ 
        const subscribeRef = collection(db, 'subscribers'); 
        const subscribeSnap = await getDocs(subscribeRef);
        res.json({count:subscribeSnap.size})
    }catch(error){
        console.error('Error al obtener el contador de suscripciones:', error);
        res.status(500).json({ error: 'No se pudo obtener el contador' });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
