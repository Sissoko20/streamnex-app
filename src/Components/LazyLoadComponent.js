// LazyLoadComponent.js
import React, { useState, useEffect, useRef } from 'react';

// Composant qui charge ses enfants seulement lorsqu'il est visible à l'écran
const LazyLoadComponent = ({ children }) => {
  const ref = useRef(null); // Réfère à l'élément DOM
  const [isVisible, setIsVisible] = useState(false); // État pour suivre la visibilité

  useEffect(() => {
    // Crée un observateur d'intersection
    const observer = new IntersectionObserver(
      (entries) => {
        // Vérifie si l'élément est visible
        if (entries[0].isIntersecting) {
          setIsVisible(true); // Met à jour l'état pour rendre les enfants visibles
          observer.disconnect(); // Déconnecte l'observateur après avoir détecté la visibilité
        }
      },
      { threshold: 0.1 } // Se déclenche quand 10% de l'élément est visible
    );

    if (ref.current) {
      observer.observe(ref.current); // Observe l'élément
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Nettoie l'observation quand le composant est démonté
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};

export default LazyLoadComponent;
