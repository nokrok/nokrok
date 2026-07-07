const API_URL = "https://script.google.com/macros/s/AKfycbzwVn-M3tI8inBD8PkSc4C7x1IPtHwwy0ZShP1H8tBCez25ph02Xn30ZXTV5DWLkWeNdw/exec";

const itemNames = {
  "001": "001 portrait",
  "002": "002 camera",
  "003": "003 postcard",
  "004": "004 spider",
  "005": "005 pineapple",
  "006": "006 beer girl",
  "007": "007 red shoes",
  "008": "008 white ferret",
  "009": "009 rock",
  "010": "010 mp3"
};

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const password = params.get("password");

const itemTitle = document.getElementById("itemTitle");
const postText = document.getElementById("postText");

itemTitle.textContent = itemNames[id] || "unknown item";

if (!id || !password) {
  window.location.href = "board.html";
}

loadPost();

async function loadPost() {
  try {
    const response = await fetch(
      `${API_URL}?action=read&itemId=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`
    );

    const result = await response.json();

    if (!result.ok) {
      alert("wrong password");
      window.location.href = "board.html";
      return;
    }

    const post = result.post;

    postText.textContent =
`${post.title}

from. ${post.name}

${post.message}`;

  } catch (error) {
    console.error(error);
    postText.textContent = "게시글을 불러오지 못했습니다.";
  }
}
