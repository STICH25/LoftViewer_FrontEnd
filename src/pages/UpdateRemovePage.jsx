import { useState, useEffect, useRef } from "react";
import PageTitle from "../components/PageTitle.jsx";
import { getBirds, getBirdImage } from "../apiControllers/birdController.jsx";
import UpdateBirdPage from "../components/UpdateRemoveComponent.jsx";
import "../assets/css/textWithShadow.css";

const RemoveDeleteBird = () => {
  const [birds, setBirds] = useState([]);
  const [birdImages, setBirdImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchBirds();
  }, []);

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
      <div className="flex flex-1">
        <main className="add-title-container">
          <PageTitle word="Updates" />
          <UpdateBirdPage birds={birds} birdImages={birdImages} onUpdateSuccess={fetchBirds}/>
        </main>
      </div>
    </div>
  );
};

export default RemoveDeleteBird;
