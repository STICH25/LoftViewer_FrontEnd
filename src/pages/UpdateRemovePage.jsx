import PageTitle from "../components/PageTitle.jsx";
import UpdateBirdPage from "../components/UpdateRemoveComponent.jsx";
import { useBirds } from "../hooks/useBirds";
import "../assets/css/textWithShadow.css";

const RemoveDeleteBird = () => {
  const { birds, birdImages, refresh } = useBirds();

  return (
    <div className="body">
      <div className="flex flex-1">
        <main className="add-title-container">
          <PageTitle word="Updates" />
          <UpdateBirdPage birds={birds} birdImages={birdImages} onUpdateSuccess={refresh} />
        </main>
      </div>
    </div>
  );
};

export default RemoveDeleteBird;
