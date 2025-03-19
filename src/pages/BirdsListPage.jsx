import { useState, useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import PageTitle from "../components/PageTitle.jsx";
import BirdCards from "../components/BirdCards.jsx";
import { getBirds, getBirdImage } from "../apiControllers/birdController.jsx";
import "../assets/css/addPage.css";
import "../assets/css/birdCard.css";
import "../assets/css/addPage.css";

const BirdsList = () => {
  const [birds, setBirds] = useState([]);
  const [birdImages, setBirdImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchBirds();
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Fetch all birds from API
  const fetchBirds = async () => {
    setLoading(true);
    try {
      const data = await getBirds();
      setBirds(data);
      await fetchAllBirdImages(data);
    } catch (error) {
      console.error("Error fetching birds:", error);
      setErrorMessage("Failed to fetch birds. Please try again.");
    }
    setLoading(false);
  };

  // Fetch images for all birds
  const fetchAllBirdImages = async (birds) => {
    const images = {};
    for (const bird of birds) {
      try {
        const imageUrl = await getBirdImage(bird.id);
        images[bird.id] = imageUrl || "/assets/tempImage.jpg"; // Fallback image
      } catch (error) {
        console.error(`Error fetching image for bird ${bird.id}:`, error);
        images[bird.id] = "/assets/tempImage.jpg"; // Use fallback
      }
    }
    setBirdImages(images);
  };

  return (
    <div className="body">
      <Header />
      <div className="flex flex-1">
        <main className="add-title-container">
          <PageTitle word="Pigeons" />
          <BirdCards birds={birds} birdImages={birdImages}/>
        </main>
      </div>
    </div>
  );
};

export default BirdsList;
