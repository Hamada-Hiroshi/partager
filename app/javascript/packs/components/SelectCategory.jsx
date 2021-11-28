import React from "react";

const SelectCategory = () => {
  return (
    <>
      <div className="drink-link" id="beer-link">
        <div className="dark-background">
          <p>Beer</p>
        </div>
      </div>
      <div className="drink-link" id="wine-link">
        <div className="dark-background">
          <p>Wine</p>
        </div>
      </div>
      <div className="drink-link" id="sake-link">
        <div className="dark-background">
          <p>Japanese Sake</p>
        </div>
      </div>
    </>
  );
};
export default SelectCategory;
