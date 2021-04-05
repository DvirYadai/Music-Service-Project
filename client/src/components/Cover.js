import React from "react";
import { Link } from "react-router-dom";

export default function Cover({ item, coverType }) {
  return (
    <div>
      <Link to={`/${coverType}/${item.id}`}>
        <img
          src={
            item.img
              ? item.img
              : item.thumbnail.url
              ? item.thumbnail.url
              : item.thumbnail
              ? item.thumbnail
              : null
          }
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </Link>
      <p className="imgName">
        {coverType === "album" ? item.title : item[`${coverType}Name`]}
      </p>
      <p className="album-artist">
        {coverType === "album" ? item.artistName : null}
      </p>
    </div>
  );
}
