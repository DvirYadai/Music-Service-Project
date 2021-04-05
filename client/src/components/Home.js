import React from "react";
import data from "../artistList.json";
import playlists from "../playlists.json";
import TopFive from "./TopFive";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h2>top 5 songs</h2>
      <TopFive topFiveSongs={topFiveSongs()} coverType="song" />
      <h2>top 5 artists</h2>
      <TopFive topFiveArtists={topFiveArtists()} coverType="artist" />
      <h2>top 5 albums</h2>
      <TopFive topFiveAlbums={topFiveAlbums()} coverType="album" />
      <h2>top 5 playlists</h2>
      <TopFive topFivePlaylist={topFivePlaylist()} coverType="playlist" />
    </div>
  );
}

const topFiveSongs = () => {
  const songsArray = [];
  data.forEach((artist) => {
    const albums = artist.albumArray;
    albums.forEach((album) => {
      const songs = album.songs;
      songs.forEach((song) => {
        if (song) {
          songsArray.push(song);
        }
      });
    });
  });
  songsArray.sort((a, b) => {
    return b.statistics.viewCount - a.statistics.viewCount;
  });
  return songsArray.slice(0, 5);
};

const topFiveArtists = () => {
  const artistsArray = [...data];
  artistsArray.sort((a, b) => {
    return b.views - a.views;
  });
  return artistsArray.slice(0, 5);
};

const topFiveAlbums = () => {
  const albumsArray = [];
  data.forEach((artist) => {
    const albums = artist.albumArray;
    albums.forEach((album) => {
      let views = 0;
      album.songs.forEach((song) => {
        if (song && song.statistics.viewCount) {
          views += Number(song.statistics.viewCount);
        }
      });
      album.totalViews = views;
      albumsArray.push(album);
    });
  });
  albumsArray.sort((a, b) => {
    return b.totalViews - a.totalViews;
  });
  return albumsArray.slice(0, 5);
};

const topFivePlaylist = () => {
  const playListArray = [...playlists];
  playListArray.sort((a, b) => {
    return b.viewCount - a.viewCount;
  });
  return playListArray;
};
