import { addNewTask, updateTask } from "./server";

(async function myfun() {
  await addToFavorites({
    movie: {
      vote_count: 1230,
      id: 166428,
      video: false,
      vote_average: 7.7,
      title: "How to Train Your Dragon: The Hidden World",
      popularity: 470.427,
      poster_path: "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
      original_language: "en",
      original_title: "How to Train Your Dragon: The Hidden World",
      genre_ids: [16, 10751, 12],
      backdrop_path: "/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg",
      adult: false,
      overview:
        "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.",
      release_date: "2019-01-03"
    },
    userID: 1234567
  });
  await removeFromFavorites({
    movie: {
      vote_count: 1230,
      id: 166428,
      video: false,
      vote_average: 7.7,
      title: "How to Train Your Dragon: The Hidden World",
      popularity: 470.427,
      poster_path: "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
      original_language: "en",
      original_title: "How to Train Your Dragon: The Hidden World",
      genre_ids: [16, 10751, 12],
      backdrop_path: "/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg",
      adult: false,
      overview:
        "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.",
      release_date: "2019-01-03"
    },
    userID: 1234567
  });
})();
