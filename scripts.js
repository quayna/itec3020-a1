document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });

  // Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );

    const icon = toggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    const icon = toggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");
  fetch("posts.json")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("article");

        postElement.innerHTML = `
          <div class="blog-post-header">
    <span class="blog-date">${post.date}</span>
    <div class="blog-content">
      <h2 class="blog-title"><a href="${post.url}">${post.title}</a></h2>
      <p class="excerpt">${post.excerpt}</p>
      <a href="${post.url}" class="read-more">Read More →</a>
    </div>
  </div>
        `;

        blogList.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error loading blog posts:", error));
});
