import React from "react";
import Cover from "./Cover";

export default function TopFive({
  topFiveSongs,
  topFiveArtists,
  topFiveAlbums,
  topFivePlaylist,
  coverType,
}) {
  const whoToSent = () => {
    if (topFiveSongs) {
      return topFiveSongs;
    } else if (topFiveArtists) {
      return topFiveArtists;
    } else if (topFiveAlbums) {
      return topFiveAlbums;
    } else return topFivePlaylist;
  };

  const a = whoToSent();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "auto",
        width: "70%",
      }}
    >
      {a.map((item) => (
        <Cover key={item.id} item={item} coverType={coverType} />
      ))}
    </div>
  );
}
