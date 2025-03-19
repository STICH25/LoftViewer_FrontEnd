import { useState } from "react";
import { UpdateBird, deleteBird } from "../apiControllers/birdController.jsx";
import "../assets/css/UpdatePage.css";
import "../assets/css/birdCard.css";
import "../assets/css/addPage.css";

const UpdateBirdPage = ({
  birds,
  birdImages = { birdImages },
  onUpdateSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBird, setSelectedBird] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSearch = () => {
    const foundBird = birds.find(
      (bird) =>
        bird.birdName.toLowerCase() === searchTerm.toLowerCase() ||
        bird.birdNumber === searchTerm
    );
    if (foundBird) {
      setSelectedBird(foundBird);
      setPreviewImage(foundBird.image || null); // Show existing image
      setError(null);
    } else {
      setError("Bird not found.");
      setSelectedBird(null);
      setPreviewImage(null);
    }
  };

  const handleChampionCheck = (e) => {
    setSelectedBird((prevBird) => ({
      ...prevBird,
      champion: e.target.checked ? "Champion Bird" : "",
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("id", selectedBird.id);
      formData.append("birdName", selectedBird.birdName);
      formData.append("birdNumber", selectedBird.birdNumber);
      formData.append("birdColor", selectedBird.birdColor);
      formData.append("birdFather", selectedBird.birdFather);
      formData.append("birdMother", selectedBird.birdMother);
      formData.append("champion", selectedBird.champion);

      // Only append image if a new one is selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      // Send the request
      await UpdateBird(selectedBird.id, formData);
      setSearchTerm("");
      setSelectedBird(null);
      setPreviewImage(null);
      setSelectedImage(null);
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating bird:", error);
      setError("Failed to update bird.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`User Id: ${selectedBird.id}`);
      await deleteBird(selectedBird.id);
      setSearchTerm("");
      setSelectedBird(null);
      setPreviewImage(null);
      console.log("The Bird was successfully deleted");
    } catch (error) {
      console.error("Error deleting bird:", error);
      setError("Failed to delete bird.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-container">
      <div className="search-form-container">
        <input
          type="text"
          placeholder="Search by Name or Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="custom-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {selectedBird && (
        <>
          <div className="card-container">
            <div className="card">
              <div className="card-head">
                <img
                  src="../src/assets/images/tempImage.jpg"
                  className="card-logo"
                  alt="Bird Logo"
                />
                <span>
                  <label
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={
                        previewImage ||
                        birdImages[selectedBird.id] ||
                        "/assets/tempImage.jpg"
                      }
                      className="product-img"
                      style={{
                        display: "inline-block",
                        marginTop: 20,
                        position: "absolute",
                      }}
                      alt="Bird Image"
                      width="160"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>
                </span>
                <div className="bird-name">
                  <h2>{selectedBird.birdName}</h2>
                </div>
              </div>
              <div className="card-body">
                <span className="product-details h3">
                  <h3>update Pigeon:</h3>
                </span>
                <div className="update-fields">
                  <span className="update-input">
                    Number: {selectedBird.birdNumber}
                  </span>
                  <span className="update-input-fields">
                    <label htmlFor="mother">Mother:</label>
                    <input
                      id="mother"
                      type="text"
                      value={selectedBird.birdMother}
                      onChange={(e) =>
                        setSelectedBird({
                          ...selectedBird,
                          birdMother: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </span>
                  <div className="update-input-fields">
                    <label htmlFor="father">Father:</label>
                    <input
                      id="father"
                      type="text"
                      value={selectedBird.birdFather}
                      onChange={(e) =>
                        setSelectedBird({
                          ...selectedBird,
                          birdFather: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </div>

                  <span className="update-input-fields">
                    <label htmlFor="color">Color:</label>
                    <input
                      id="color"
                      type="text"
                      value={selectedBird.birdColor}
                      onChange={(e) =>
                        setSelectedBird({
                          ...selectedBird,
                          birdColor: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </span>
                </div>

                {selectedBird.champion === "N/A" && (
                  <span className="update-check">
                    <input
                      type="checkbox"
                      checked={selectedBird.champion === "Champion Bird"}
                      onChange={handleChampionCheck}
                    />
                    Champion Bird
                  </span>
                )}
                <div>
                  <span className="champion-label-update">
                    <b>{selectedBird.champion}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Updating..." : "Update Bird"}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="delete-btn"
            >
              {loading ? "Deleting..." : "Deleting Bird"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateBirdPage;
