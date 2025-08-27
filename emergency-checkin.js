// Lottie animation
document.addEventListener("DOMContentLoaded", () => {
  lottie.loadAnimation({
    container: document.getElementById("lottie-alert"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets1.lottiefiles.com/packages/lf20_twijbubv.json"
  });

  // Mark Safe button
  document.getElementById("btn-safe").addEventListener("click", () => {
    alert("✅ You have marked yourself safe.");
  });

  // Need Help button
  document.getElementById("btn-help").addEventListener("click", () => {
    alert("🆘 Help request sent. Stay strong, help is on the way.");
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
// Initial layout adjustment
adjustLayout();