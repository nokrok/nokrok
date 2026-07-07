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

const itemTitle = document.getElementById("itemTitle");
const postText = document.getElementById("postText");

itemTitle.textContent = itemNames[id] || "unknown item";

async function loadPost() {
  if (!id) {
    postText.textContent = "잘못된 접근입니다.";
    return;
  }

  const password = sessionStorage.getItem("postPassword");

  if (!password) {
    postText.textContent = "비밀번호 확인이 필요합니다.";
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}?action=read&itemId=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`
    );

    const result = await response.json();

    if (!result.ok) {
      postText.textContent = "비밀번호가 틀렸거나 게시글을 불러올 수 없습니다.";
      return;
    }

    const data = result.post;

    postText.textContent =
`${data.title}

from. ${data.name}

${data.message}`;

  } catch (error) {
    console.error(error);
    postText.textContent = "게시글을 불러오는 중 오류가 발생했습니다.";
  }
}

loadPost();
