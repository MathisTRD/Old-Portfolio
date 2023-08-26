document.addEventListener("DOMContentLoaded", function () {
  const storyBoxes = document.querySelectorAll('.story-box');
  const expandedOverlay = document.querySelector('.expanded-overlay');
  const expandedBox = document.querySelector('.expanded-box');
  const expandedContent = document.querySelector('.expanded-content');
  const prevArrow = document.querySelectorAll('.prev-arrow');
  const nextArrow = document.querySelectorAll('.next-arrow');

  let currentIndex = 0;
  let shuffledIndices = Array.from({ length: storyBoxes.length }, (_, i) => i);
  shuffleArray(shuffledIndices);

  

  const updateCarousel = () => {
    storyBoxes.forEach((box, index) => {
      if (window.innerWidth <= 866) {
        if (
          shuffledIndices[currentIndex] === index ||
          (currentIndex + 1 < shuffledIndices.length && shuffledIndices[currentIndex + 1] === index)
        ) {
          box.style.display = 'block';
        } else {
          box.style.display = 'none';
        }
      } else {
        box.style.display = 'block';
      }
    });
  
    // If there's only one box displayed, move to the next box if available
    if (window.innerWidth <= 866 && currentIndex + 1 < shuffledIndices.length &&
        shuffledIndices[currentIndex] === shuffledIndices[currentIndex + 1]) {
      currentIndex = (currentIndex + 1) % shuffledIndices.length;
      updateCarousel();
    }
  };

    prevArrow.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 2 + storyBoxes.length) % storyBoxes.length;
        updateCarousel();
      });
    });

    nextArrow.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 2) % storyBoxes.length;
        updateCarousel();
      });
    });

  // Initialisieren
  updateCarousel();

  // Event Listener für Fenstergrößenänderungen
  window.addEventListener('resize', updateCarousel);

  // Loop through storyBoxes and fetch JSON data for each story
  storyBoxes.forEach((box, index) => {
    fetch(`assets/stories/story${index + 1}.json`)
      .then(response => response.json())
      .then(data => {
        const titleElement = box.querySelector('.title');
        const previewElement = box.querySelector('.preview');
        const detailElement = box.querySelector('.detail');
  
        titleElement.textContent = data.title;
        previewElement.innerText = data.preview;
        detailElement.innerText = data.detail;
      })
      .catch(error => console.error('Error loading JSON data:', error));
  });

  storyBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const detail = box.querySelector('.detail');

      // Clone the card and insert it into the expanded view
      const contentClone = box.cloneNode(true);
      expandedContent.innerHTML = ''; // Clear previous content
      expandedContent.appendChild(contentClone);

      // Add the class to remove hover styles
      contentClone.classList.add('clone');

      // Display the expanded view
      expandedOverlay.style.display = 'block';
      expandedBox.style.display = 'block';

      // Toggle the display of .preview and .detail in the cloned card
      const previewClone = contentClone.querySelector('.preview');
      const detailClone = contentClone.querySelector('.detail');
      previewClone.style.display = 'none';
      detailClone.style.display = 'block';

      // Toggle the display of .preview and .detail in the clicked card
      const preview = box.querySelector('.preview');
      detail.style.display = 'none';
      preview.style.display = 'block';

      document.body.style.overflow = 'hidden';
    });
  });

  // Close fullscreen when clicking outside of the card's content
  expandedOverlay.addEventListener('click', () => {
    expandedOverlay.style.display = 'none';
    expandedBox.style.display = 'none';
    document.body.style.overflow = 'auto';

    storyBoxes.forEach((box) => {
      const detail = box.querySelector('.detail');
      const preview = box.querySelector('.preview');

      // Reset the display of .preview and .detail in all story boxes
      detail.style.display = 'none';
      preview.style.display = 'block';
    });
  });
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});
