const input = document.querySelector(".input-search")

input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();
    const cardsTitles = document.querySelectorAll(".card-title");
    cardsTitles.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (filter && text.indexOf(filter) === -1) {
        card.parentNode.parentNode.parentNode.style.display = "none";
      }
     else {
        card.parentNode.parentNode.parentNode.style.display = "block";
      }
    });
})