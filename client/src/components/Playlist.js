import React from "react";
import playlists from "../playlists.json";
import { Link } from "react-router-dom";

export default function Playlist({ match }) {
  const getPlaylist = () => {
    return playlists.filter(
      (playlist) => playlist.id === Number(match.params.id)
    );
  };

  const currentPlaylist = getPlaylist();

  return (
    <div>
      <h1>{currentPlaylist[0].playlistName}</h1>
      <img
        src={currentPlaylist[0].img}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <h3>{`Creation time: ${currentPlaylist[0].createdAt}`}</h3>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "space-evenly",
          margin: "auto",
          width: "70%",
        }}
      >
        {currentPlaylist[0].songs.map((song) => (
          <div>
            <Link to={`/song/${song.id}?playlist=${currentPlaylist[0].id}`}>
              <img src={song.img} style={{ width: "150px", height: "150px" }} />
            </Link>
            <p style={{ width: "11rem" }}>{song.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
