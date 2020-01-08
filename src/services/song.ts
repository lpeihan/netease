export interface ISong {
  id: any;
  singer: string;
  name: string;
  image: string;
  desc: string;
}

class Song {
  id: string;
  singer: string;
  name: string;
  image: string;
  desc: string;

  constructor(song: ISong) {
    this.id = song.id;
    this.singer = song.singer;
    this.name = song.name;
    this.image = song.image;
    this.desc = song.desc;
  }
}

function singerName(names: any[]) {
  let name = [];
  name = names.map(item => {
    return item.name;
  });

  return name.join("/");
}

export function createSong(song: any) {
  return new Song({
    id: song.id,
    singer: singerName(song.ar),
    name: song.name,
    image: song.al.picUrl,
    desc: `${song.al.name}`
  });
}

export function createSearchSong(song: any) {
  return new Song({
    id: song.id,
    name: song.name,
    singer: singerName(song.artists),
    desc: song.album.name,
    image: song.artists[0].img1v1Url
  });
}
