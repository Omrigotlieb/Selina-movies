import md5 from "md5";

export const defaultState = {
  users: [
    {
      id: "U1",
      name: "Dev",
      passwordHash: md5("Dev"),
      favorites: [
        {
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
        {
          vote_count: 3221,
          id: 299537,
          video: false,
          vote_average: 7.2,
          title: "Captain Marvel",
          popularity: 351.105,
          poster_path: "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
          original_language: "en",
          original_title: "Captain Marvel",
          genre_ids: [28, 12, 878],
          backdrop_path: "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
          adult: false,
          overview:
            "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
          release_date: "2019-03-06"
        },
        {
          vote_count: 585,
          id: 458723,
          video: false,
          vote_average: 7.4,
          title: "Us",
          popularity: 260.31,
          poster_path: "/ux2dU1jQ2ACIMShzB3yP93Udpzc.jpg",
          original_language: "en",
          original_title: "Us",
          genre_ids: [53, 27],
          backdrop_path: "/jNUCddkM1fjYcFIcEwFjc7s2H4V.jpg",
          adult: false,
          overview:
            "Husband and wife Gabe and Adelaide Wilson take their kids to their beach house expecting to unplug and unwind with friends. But as night descends, their serenity turns to tension and chaos when some shocking visitors arrive uninvited.",
          release_date: "2019-03-14"
        }
      ],
      roll: 'Admin'
    },
    {
      id: "U2",
      name: "Omri",
      passwordHash: md5("Gotlieb"),
      favorites: [
        {
          vote_count: 3221,
          id: 299537,
          video: false,
          vote_average: 7.2,
          title: "Captain Marvel",
          popularity: 351.105,
          poster_path: "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
          original_language: "en",
          original_title: "Captain Marvel",
          genre_ids: [28, 12, 878],
          backdrop_path: "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
          adult: false,
          overview:
            "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
          release_date: "2019-03-06"
        }
      ]
    },
    {
      id: "U3",
      name: "Yoni",
      passwordHash: md5("Kalangan"),
      favorites: [
        {
          vote_count: 1068,
          id: 504172,
          video: false,
          vote_average: 6.5,
          title: "The Mule",
          popularity: 118.912,
          poster_path: "/oeZh7yEz3PMnZLgBPhrafFHRbVz.jpg",
          original_language: "en",
          original_title: "The Mule",
          genre_ids: [80, 18, 53],
          backdrop_path: "/bTeRgkAavyw1eCtSkaww18wLYNP.jpg",
          adult: false,
          overview:
            "Earl Stone, a man in his 80s who is broke, alone, and facing foreclosure of his business when he is offered a job that simply requires him to drive. Easy enough, but, unbeknownst to Earl, he’s just signed on as a drug courier for a Mexican cartel. He does so well that his cargo increases exponentially, and Earl hit the radar of hard-charging DEA agent Colin Bates.",
          release_date: "2018-12-14"
        }
      ]
    },
    {
      id: "U4",
      name: "Admin",
      passwordHash: md5("God"),
      favorites: []
    }
  ]
};
