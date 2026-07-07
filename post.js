const API_URL = "https://script.google.com/macros/s/AKfycbylNf4C-lGPTj3azmJhqzXAMRrev-5YkFHyzSomg0hmG5WXHzXeNpVlb85WHJLcxVt7/exec";

const itemNames = {
  "001":"001 portrait",
  "002":"002 camera",
  "003":"003 postcard",
  "004":"004 spider",
  "005":"005 pineapple",
  "006":"006 beer girl",
  "007":"007 red shoes",
  "008":"008 white ferret",
  "009":"009 rock",
  "010":"010 mp3"
};

const params = new URLSearchParams(location.search);

const id=params.get("id");

document.getElementById("itemTitle").textContent=itemNames[id];

const password=sessionStorage.getItem("postPassword");

if(!password){

    location.href="board.html";

}

load();

async function load(){

    try{

        const response=await fetch(
`${API_URL}?action=read&itemId=${id}&password=${encodeURIComponent(password)}`
);

        const result=await response.json();

        if(!result.ok){

            alert("비밀번호가 틀렸습니다.");

            location.href="board.html";

            return;

        }

        const post=result.post;

        document.getElementById("postText").textContent=
`${post.title}

from. ${post.name}

${post.message}`;

    }

    catch(err){

        console.error(err);

        document.getElementById("postText").textContent="오류가 발생했습니다.";

    }

}
