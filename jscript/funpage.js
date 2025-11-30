// funpage.js
// The Fit Zone - Muscle Match Quiz
// Drag-and-drop game where users match exercises to the correct muscle group.
// Now includes a simple shuffle so the muscle groups appear in random order.

document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzonesContainer = document.getElementById("muscles");
  const checkBtn = document.getElementById("checkBtn");
  const result = document.getElementById("result");

  // ✅ Shuffle the order of muscle group boxes (simple Fisher–Yates shuffle)
  const zones = Array.from(dropzonesContainer.children);
  for (let i = zones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [zones[i], zones[j]] = [zones[j], zones[i]];
  }
  zones.forEach(z => dropzonesContainer.appendChild(z));

  // 🎯 Drag & drop setup
  draggables.forEach(item => item.addEventListener("dragstart", dragStart));
  const dropzones = document.querySelectorAll(".dropzone");
  dropzones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.muscle);
    e.dataTransfer.setData("text/id", e.target.textContent);
  }

  function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("border-warning");
  }

  function drop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("border-warning");

    const exerciseText = e.dataTransfer.getData("text/id");
    const existing = e.currentTarget.querySelector(".dropped");
    if (existing) existing.remove();

    const newItem = document.createElement("div");
    newItem.textContent = exerciseText;
    newItem.className = "dropped bg-dark rounded p-2 mt-2 text-light";
    e.currentTarget.appendChild(newItem);
    newItem.dataset.muscle = e.dataTransfer.getData("text/plain");
  }

  // 🧠 Check answers
  checkBtn.addEventListener("click", () => {
    let correct = 0;
    const zones = document.querySelectorAll(".dropzone");

    zones.forEach(zone => {
      const dropped = zone.querySelector(".dropped");
      if (dropped && dropped.dataset.muscle === zone.dataset.muscle) {
        correct++;
        zone.classList.add("border-success");
        zone.classList.remove("border-danger", "border-secondary");
      } else if (dropped) {
        zone.classList.add("border-danger");
        zone.classList.remove("border-success", "border-secondary");
      }
    });

    result.textContent = `You matched ${correct} out of ${zones.length} correctly!`;
    result.className = correct === zones.length ? "text-success" : "text-warning";
  });
});
