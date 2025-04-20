import { useEffect, useState } from "react";
import "../assets/css/birdCard.css";
import { deleteBird } from "../apiControllers/birdController";

const BirdCards = ({ birds, birdImages }) => {
  
  return (
    <div className="card-container">
      {birds.map((bird, index) => (
        <div className="card" key={bird.id || index}>
          <div className="card-head">
            <img
              src="../assets/images/tempImage.jpg"
              className="card-logo"
              alt="Bird Logo"
            />
            <img
              src={birdImages[bird.id] || "../assets/tempImage.jpg"}
              className="product-img"
              alt="Bird Image"
              width="160"
            />
            <div className="bird-name">
              <h2>{bird.birdName}</h2>
            </div>
          </div>
          <div className="card-body">
            <span className="product-details h3"><h3>Pigeon Details:</h3></span>
            <div className="product-rating">
              <span className="product-caption">Number: {bird.birdNumber}</span>
              <span className="product-caption">Mother: {bird.birdMother}</span>
              <span className="product-caption">Father: {bird.birdFather}</span>
              <span className="product-caption">Color: {bird.birdColor}</span>
            </div>
            <span className="champion-label">
              <b>{bird.champion}</b>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BirdCards;
