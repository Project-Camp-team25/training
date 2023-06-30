// 게시글 데이터
const posts = [
  { title: "첫 번째 게시글", content: "안녕하세요!" },
  { title: "두 번째 게시글", content: "반갑습니다!" },
];

// 게시글 목록 생성
const postList = document.querySelector(".post-list");

posts.forEach((post) => {
  const postItem = document.createElement("div");
  postItem.classList.add("post");

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;

  const postContent = document.createElement("p");
  postContent.textContent = post.content;

  postItem.appendChild(postTitle);
  postItem.appendChild(postContent);
  postList.appendChild(postItem);
});
