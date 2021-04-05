import React from "react";
import data from "../artistList.json";
import { Link } from "react-router-dom";

export default function Album({ match }) {
  const getAlbum = () => {
    const albumsArray = [];
    data.forEach((artist) => {
      const albums = artist.albumArray;
      albums.forEach((album) => {
        albumsArray.push(album);
      });
    });
    return albumsArray.filter((album) => album.id === match.params.id);
  };

  const currentAlbum = getAlbum();

  return (
    <div>
      <h1>{currentAlbum[0].title}</h1>
      <h3>{`Artist: ${currentAlbum[0].artistName}`}</h3>
      <img
        src={currentAlbum[0].thumbnail}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <h3>Songs</h3>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "space-evenly",
          margin: "auto",
          width: "70%",
        }}
      >
        {currentAlbum[0].songs.map((song) => (
          <div>
            <Link to={`/song/${song.id}?album=${currentAlbum[0].id}`}>
              <img src={song.img} style={{ width: "150px", height: "150px" }} />
            </Link>
            <p style={{ width: "11rem" }}>{song.songName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
