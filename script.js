document.addEventListener("DOMContentLoaded", function () {
  const storyBoxes = document.querySelectorAll('.story-box');
  const expandedOverlay = document.querySelector('.expanded-overlay');
  const expandedBox = document.querySelector('.expanded-box');
  const expandedContent = document.querySelector('.expanded-content');
  const closeBtn = document.querySelector('.close-btn');

  storyBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      const content = box.cloneNode(true);
      expandedContent.innerHTML = content.innerHTML;
      expandedOverlay.style.display = 'block';
      expandedBox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    expandedOverlay.style.display = 'none';
    expandedBox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});
