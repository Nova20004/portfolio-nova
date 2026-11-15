
    const toggleBtn = document.getElementById("modeToggle");
    const body = document.body;

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode");
      toggleBtn.textContent = body.classList.contains("light-mode") ? "Mode clair" : "Mode sombre";
    });

 
 
  
    document.addEventListener('DOMContentLoaded', () => {
      const progressBars = document.querySelectorAll('.progress-bar');
      
      const animateProgressBars = () => {
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      };
      
      // Délai pour que l'animation soit visible après le chargement
      setTimeout(animateProgressBars, 300);
    });