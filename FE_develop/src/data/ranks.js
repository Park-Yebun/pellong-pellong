// data/ranks.js
// const ranks = [
//   { id: 1, title: "Bronze", imageUrl: "../../assets/ranks/bronze.png" },
//   { id: 2, title: "Silver", imageUrl: "../../assets/ranks/silver.png" },
//   { id: 3, title: "Gold", imageUrl: "../../assets/ranks/gold.png" },
//   { id: 4, title: "Platinum",  imageUrl: "../../assets/ranks/platinum.png" },
//   { id: 5, title: "Diamond", imageUrl: "../../assets/ranks/diamond.png" },
//   { id: 6, title: "Master", imageUrl: "../../assets/ranks/master.png" },
//   { id: 7, title: "Grand Master", imageUrl: "../../assets/ranks/grandmaster.png" },
//   { id: 8, title: "Challenger", imageUrl: "../../assets/ranks/challenger.png" },
//     // 다른 랭크 데이터 추가...
//   ];

const ranks: Rank[] = [
  {
    id: 1,
    title: "Bronze",
    imageUrl: "../../assets/badge/small.png",
    minExperience: 0,
    maxExperience: 999
  },
  {
    id: 2,
    title: "Silver",
    imageUrl: "../../assets/ranks/silver.png",
    minExperience: 1000,
    maxExperience: 1999
  },
  // 나머지 랭크들...
];
  
  export default ranks;
  