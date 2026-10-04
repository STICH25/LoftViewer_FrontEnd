import PageTitle from "../components/PageTitle.jsx";
import BirdCards from "../components/BirdCards.jsx";
import { useBirds } from "../hooks/useBirds";
import "../assets/css/addPage.css";
import "../assets/css/birdCard.css";

const BirdsList = () => {
  const { birds, birdImages } = useBirds();

  return (
    <div className="body">
      <div className="flex flex-1">
        <main className="add-title-container">
          <PageTitle word="Pigeons" />
          <BirdCards birds={birds} birdImages={birdImages} />
        </main>
      </div>
    </div>
  );
};

export default BirdsList;
