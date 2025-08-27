// Example stock values
let foodStock = 70;  // %
let waterStock = 50; // %

document.addEventListener("DOMContentLoaded", () => {
  // Update progress bars
  document.getElementById("food-progress").style.width = foodStock + "%";
  document.getElementById("food-level").textContent = foodStock + "%";

  document.getElementById("water-progress").style.width = waterStock + "%";
  document.getElementById("water-level").textContent = waterStock + "%";
});
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
window.addEventListener("resize", adjustLayout);
adjustLayout();
