import { useState, useEffect, useRef } from "react";
import PageTitle from "../components/PageTitle.jsx";
import { addBird } from "../api/birds";
import "../assets/css/addPage.css";
import "../assets/css/textWithShadow.css";

const Birds = () => {
  const [loading, setLoading] = useState(false);
  const [newBird, setNewBird] = useState({
    birdName: "",
    birdNumber: "",
    birdColor: "",
    birdFather: "",
    birdMother: "",
    image: null,
  });
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const isFormEmpty = () => {
    return !newBird.birdName.trim() || !newBird.birdNumber.trim();
  };

  const hasImage = uploadedImage != null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBird((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (prevent file from being opened)
    event.currentTarget.classList.add("dragging");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("dragging");

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setNewBird({
      birdName: "",
      birdNumber: "",
      birdColor: "",
      birdFather: "",
      birdMother: "",
      image: null,
    });
    setUploadedImage(null);
    fileInputRef.current.value = null;
  };

  const clearImage = () => {
    setUploadedImage(null);
    fileInputRef.current.value = null;
  };

  const handleChampionCheck = (e) => {
    setNewBird((prevBird) => ({
      ...prevBird,
      birdChampion: e.target.checked ? "Champion Bird" : "",
    }));
  };

  // Handle adding a new bird
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!newBird.birdName || !newBird.birdNumber) {
      alert("Please fill in the required fields!");
      return;
    }

    const imageFile = fileInputRef.current.files[0];

    setLoading(true);

    try {
      // Create FormData and append fields
      const formData = new FormData();
      formData.append("birdName", newBird.birdName);
      formData.append("birdNumber", newBird.birdNumber);
      formData.append("birdColor", newBird.birdColor);
      formData.append("birdFather", newBird.birdFather);
      formData.append("birdMother", newBird.birdMother);
      formData.append("champion", newBird.birdChampion || "");
      formData.append("image", imageFile);

      // Send data to the server
      await addBird(formData);

      // Reset the form
      setNewBird({
        birdName: "",
        birdNumber: "",
        birdColor: "",
        birdFather: "",
        birdMother: "",
        birdChampion: "",
        image: null,
      });
      fileInputRef.current.value = null; // Reset file input
      setUploadedImage(null);

      setSuccessMessage("Bird added successfully!");
      setErrorMessage("");

    } catch (error) {
      console.error("Error adding bird:", error);
      setErrorMessage("Failed to add bird. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="flex flex-1">
        <main className="add-title-container">
          <PageTitle word="Add Pigeon" />
          <div className="form-container">
            <form className="container" onSubmit={handleSubmit}>
              <input
                type="text"
                name="birdName"
                placeholder="Bird Name"
                value={newBird.birdName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="birdNumber"
                placeholder="Bird Number"
                value={newBird.birdNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="birdColor"
                placeholder="Bird Color"
                value={newBird.birdColor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="birdFather"
                placeholder="Bird Father"
                value={newBird.birdFather}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="birdMother"
                placeholder="Bird Mother"
                value={newBird.birdMother}
                onChange={handleInputChange}
              />
              <label className="champion-label-check">
                <input
                  type="checkbox"
                  style={{ marginBottom: 5 }}
                  checked={newBird.birdChampion === "Champion Bird"}
                  onChange={handleChampionCheck}
                />
                Champion Bird
              </label>
              <div className="add-button-container">
                <button
                  className="add-button"
                  type="submit"
                  disabled={isFormEmpty() || loading}
                >
                  {loading ? "Adding Data" : "Add Bird"}
                </button>
                <button
                  className="add-button"
                  type="button"
                  onClick={handleClear}
                  disabled={isFormEmpty()}
                >
                  Reset Form
                </button>
              </div>
            </form>
            <div className="image-section">
              <div
                className="image-preview-container"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <img
                  src={uploadedImage || "../assets/images/uploadPreview.jpg"}
                  alt="Preview"                  
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <h6
                style={{
                  marginBottom: 0,
                  marginTop: 5,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  fontSize: 14,
                  textAlign: "center", // Correctly centers the text
                  display: "block", // Ensures block-level behavior
                  width: "100%",
                }}
              >
                <p>Drag and drop an image here,</p>
                <p>or click to upload image.</p>
              </h6>
              <div className="add-button-container">
                <button
                  className="add-button"
                  type="button"
                  onClick={clearImage}
                  disabled={!hasImage}
                >
                  Clear Image
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Birds;
