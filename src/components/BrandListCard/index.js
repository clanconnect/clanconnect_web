import React from "react";
import "./styles.scss";
import CreativeUploadModal from "../InfluencerUploadModal";

const BrandListCard = ({ name, uploadCreative, img, disabled }) => {
  return (
    <div className="brand-list">
      <div className="brand-list-img">
        <img src={img} alt="" />
      </div>
      <div className="brand-content">
        <div className="brand-list-content">
          <span className="list-title">{name}</span>
        </div>
        {uploadCreative ? (
          <div className="brand-list-btn">
            {disabled ? null : (
              <CreativeUploadModal
                btnText={disabled ? "Approval Pending" : "Upload Creative"}
                style={`view-btn ${disabled && "disabled"}`}
                creativeUploads
              />
            )}
          </div>
        ) : (
          <div className="brand-list-btn">
            <button className={`view-btn ${disabled && "disabled"}`}>
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandListCard;
