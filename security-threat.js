document.addEventListener("DOMContentLoaded", () => {
  // Example Crisis News
  const news = [
    { title: "Explosion Reported in City Center", detail: "Local sources confirm a blast in the market area. Rescue operations are ongoing." },
    { title: "Curfew Imposed in Affected Zones", detail: "Authorities have imposed a night curfew to maintain order and safety." },
    { title: "Civilian Evacuation in Progress", detail: "Buses are arranged for safe evacuation of families from red zones." }
  ];

  // Example Peacekeeping Progress
  const progress = [
    "Forces have secured the northern perimeter.",
    "Two suspects have been arrested during operations.",
    "Medical camps set up near safe zones.",
    "Patrolling intensified in border regions."
  ];

  // Insert News into Page
  const newsList = document.getElementById("news-list");
  news.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("news-item");
    div.innerHTML = `<h3>${item.title}</h3><p>${item.detail}</p>`;
    newsList.appendChild(div);
  });

  // Insert Progress into Page
  const progressList = document.getElementById("progress-list");
  progress.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    progressList.appendChild(li);
  });
});
// Prevent text selection on buttons
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mousedown", e => e.preventDefault());
});
// Responsive adjustments
function adjustLayout() {
  const container = document.querySelector(".container");
  if (window.innerWidth < 600) {
    container.style.gridTemplateColumns = "1fr";
  } else {
    container.style.gridTemplateColumns = "1fr 1fr";
  }
}
// Seamless navigation loader
document.querySelectorAll('.nav-links a, .auth-buttons a, .hero-buttons a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = this.getAttribute('href');

    fetch(targetUrl)
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newContent = doc.body.innerHTML;
        document.body.innerHTML = newContent;

        // Re-run scripts in new page
        const scripts = doc.querySelectorAll("script");
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });
      })
      .catch(err => console.error("Navigation error:", err));
  });
});
window.addEventListener("resize", adjustLayout);
adjustLayout();