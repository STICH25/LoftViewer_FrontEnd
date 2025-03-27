import React from "react";
import "../index.css";
import PageTitle from "../components/PageTitle";

const MainPage = () => {
   return (
    <div className="body">
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="title-container">
          <PageTitle word="Rey's Loft"/>
          {/* Sections */}
          <div className="space-y-6">
            <div className="center-image-container">
              <div className="center-image-container img">
                <img src="src/assets/images/myLoft.jpg" />
              </div>
            </div>
            <div className="text-container-title">Loft History</div>
            <div className="scrollable-container">
              <p className="text-container-text">
                This is where a description of the loft will be added! This is
                where a description of the loft will be added! This is where a
                description of the loft will be added!
              </p>
            </div>
            <div>
              <h2 className="text-container-title">Champion Birds</h2>
              <div className="image-row-container">
                <div className="card-image-container img">
                  <img src="src/assets/images/tempImage.jpg" />
                </div>
                <div className="card-image-container img">
                  <img src="src/assets/images/tempImage.jpg" />
                </div>
                <div className="card-image-container img">
                  <img src="src/assets/images/tempImage.jpg" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
