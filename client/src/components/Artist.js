import React from "react";
import data from "../artistList.json";
import { Link } from "react-router-dom";

export default function Artist({ match }) {
  const getArtist = () => {
    return data.filter((artist) => artist.id === match.params.id);
  };

  const currentArtist = getArtist();

  const getTopFiveSongs = () => {
    const songsArray = [];
    currentArtist[0].albumArray.forEach((album) => {
      const songs = album.songs;
      songs.forEach((song) => {
        if (song) {
          songsArray.push(song);
        }
      });
    });
    songsArray.sort((a, b) => {
      return b.statistics.viewCount - a.statistics.viewCount;
    });
    return songsArray.slice(0, 5);
  };

  const topFiveSongs = getTopFiveSongs();

  return (
    <div>
      <h1>{currentArtist[0].artistName}</h1>
      <img
        src={currentArtist[0].thumbnail.url}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <h3>Albums:</h3>
      {currentArtist[0].albumArray.map((album) => (
        <p>{album.title}</p>
      ))}
      <h3>Top 5 songs:</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "auto",
          width: "70%",
        }}
      >
        {topFiveSongs.map((song) => (
          <div>
            <Link to={`/song/${song.id}?artist=${currentArtist[0].id}`}>
              <img
                src={song.img}
                style={{ width: "150px", height: "150px", marginLeft: "1rem" }}
              />
            </Link>
            <p>{song.songName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
