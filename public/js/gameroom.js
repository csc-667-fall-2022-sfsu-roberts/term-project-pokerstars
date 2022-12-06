// $(document).ready(function () {
//   $.getScript("cards.js", function () {
//     getCardImage();
//   });
// });

let card1 = document.getElementById("player1");
let commonCard_1 = document.getElementById("cc1");
let commonCard_2 = document.getElementById("cc2");
let commonCard_3 = document.getElementById("cc3");
let commonCard_4 = document.getElementById("cc4");
let commonCard_5 = document.getElementById("cc5");

card1.children[0].classList.add(cardImages.get(5));
card1.children[1].classList.add(cardImages.get(35));
commonCard_1.classList.add(cardImages.get(15));
commonCard_2.classList.add(cardImages.get(20));
commonCard_3.classList.add(cardImages.get(30));
commonCard_4.classList.add(cardImages.get(40));
commonCard_5.classList.add(cardImages.get(51));
