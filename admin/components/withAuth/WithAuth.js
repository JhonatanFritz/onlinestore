// withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Si no hay un token, redirige a la página de inicio de sesión
        router.push('./');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  // Agregar un nombre al componente (puede ser útil para debugging)
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

// Función auxiliar para obtener el nombre del componente envuelto
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
