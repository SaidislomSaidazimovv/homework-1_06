import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       await checkAuth();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.username) {
    return <Navigate to="/login" />;
  }
else{
  
  return   children;

}
};

export default RequireAuth;
