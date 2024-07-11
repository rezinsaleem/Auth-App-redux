import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PublicRouteProps {
  component: ComponentType;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component />;
};

export default PublicRoute;
