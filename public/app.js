let btns = document.querySelectorAll(".deleteBtn");

btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!confirm("Are you sure you want to delete this chat?")) {
      event.preventDefault();
    }
  });
});
