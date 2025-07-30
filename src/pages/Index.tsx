
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to unified properties page
    navigate('/properties');
  }, [navigate]);

  return null;
};

export default Index;
