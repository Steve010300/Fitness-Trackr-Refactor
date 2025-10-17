import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getActivity(id);
        setActivity(data);
      } catch (error) {
        setError(error.message);
      }  
    }
    loadActivity();
  }, [id]);


  async function handleDelete() {
    try {
      await deleteActivity(token, id);
      navigate("/");
    } catch (error) {
      setError(error.message)  
    }
  }

  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>
        <strong>Created by:</strong> {activity.creatorName}
      </p>

      {token && <button onClick={handleDelete}>Delete</button>}  
    </div>
  )
}