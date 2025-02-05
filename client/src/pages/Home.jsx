import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [recipe, setRecipe] = useState([]);

  const API_URL = "http://localhost:3000";

  const getRandomRecipe = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);

      const data = response.data;

      setRecipe(data.results || []);

      console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);
}

export default Home;
