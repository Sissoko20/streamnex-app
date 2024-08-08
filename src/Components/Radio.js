import React, { useState } from 'react';
import { Button } from 'antd';
import { db } from '../firebase';  // Assurez-vous que le chemin est correct
import { collection, addDoc } from 'firebase/firestore';

function Radio() {
  const [position, setPosition] = useState('end');
  const [channels, setChannels] = useState([]);

  const handleSaveChannels = async () => {
    try {
      // Exemple de chaînes à stocker
      const exampleChannels = []
    

      // Référence à la collection 'channels' dans Firestore
      const channelsCollectionRef = collection(db, 'channels');

      // Ajout de chaque chaîne à Firestore
      for (const channel of exampleChannels) {
        await addDoc(channelsCollectionRef, channel);
      }

      alert('Channels saved successfully!');
    } catch (error) {
      console.error('Error saving channels: ', error);
      alert('Failed to save channels.');
    }
  };

  return (
    <div>
      <h1>Radio</h1>
      <Button type="primary" onClick={handleSaveChannels}>
        Save Channels
      </Button>
    </div>
  );
}

export default Radio;
