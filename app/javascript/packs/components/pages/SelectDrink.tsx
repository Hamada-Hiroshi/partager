import React from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../templates/DefaultLayout";

const SelectDrink: React.VFC = () => {
  return (
    <DefaultLayout>
      <Link to="/beer">
        <div className="drink-link" id="beer-link">
          <div className="dark-background">
            <p>Beer</p>
          </div>
        </div>
      </Link>
      <Link to="/wine">
        <div className="drink-link" id="wine-link">
          <div className="dark-background">
            <p>Wine</p>
          </div>
        </div>
      </Link>
      <Link to="/sake">
        <div className="drink-link" id="sake-link">
          <div className="dark-background">
            <p>Japanese Sake</p>
          </div>
        </div>
      </Link>

      <div className="footer"></div>
    </DefaultLayout>
  );
};
export default SelectDrink;
