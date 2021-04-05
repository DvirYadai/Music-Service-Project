import React from "react";
import playlists from "../playlists.json";
import data from "../artistList.json";
import YouTube from "react-youtube";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default function Song({ match }) {
  const parsed = queryString.parse(window.location.search);

  const currentQuery = parsed.artist
    ? `artist`
    : parsed.album
    ? `album`
    : parsed.playlist
    ? `playlist`
    : null;

  const getArtist = () => {
    return data
      .filter((artist) => artist.id === parsed.artist)[0]
      .albumArray[0].songs.slice(0, 4);
  };

  const getAlbum = () => {
    const albumsArray = [];
    data.forEach((artist) => {
      const albums = artist.albumArray;
      albums.forEach((album) => {
        albumsArray.push(album);
      });
    });
    return albumsArray
      .filter((album) => album.id === parsed.album)[0]
      .songs.slice(0, 4);
  };

  const getPlaylist = () => {
    return playlists
      .filter((playlist) => playlist.id === Number(parsed.playlist))[0]
      .songs.slice(0, 4);
  };

  const getSong = () => {
    const songsArray = [];
    data.forEach((artist) => {
      const albums = artist.albumArray;
      albums.forEach((album) => {
        const songs = album.songs;
        songs.forEach((song) => {
          if (song) {
            song.albumName = album.title;
            songsArray.push(song);
          }
        });
      });
    });
    return songsArray.filter((song) => song.id === match.params.id);
  };

  const suggestedSongs = parsed.artist
    ? getArtist()
    : parsed.album
    ? getAlbum()
    : parsed.playlist
    ? getPlaylist()
    : null;
  const currentSong = getSong();

  return (
    <div>
      <h1>{currentSong[0].songName}</h1>
      <h3>{`Album: ${currentSong[0].albumName}`}</h3>
      <YouTube videoId={currentSong[0].id} />
      {currentQuery && (
        <>
          <h3>Suggested songs:</h3>
          <div
            style={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "space-evenly",
              margin: "auto",
              width: "70%",
            }}
          >
            {suggestedSongs.map((song) => (
              <div>
                <Link to={`/song/${song.id}`}>
                  <img
                    src={song.img}
                    style={{ width: "150px", height: "150px" }}
                  />
                </Link>
                <p style={{ width: "11rem" }}>{song.snippet.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
