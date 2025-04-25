// content.js
(function() {
  // Wait for YouTube to fully load
  const checkForYouTubePlayer = setInterval(() => {
    const youtubePlayer = document.querySelector('.html5-video-player');
    const rightControls = document.querySelector('.ytp-right-controls');
    
    if (youtubePlayer && rightControls && !document.querySelector('.screenshot-btn')) {
      clearInterval(checkForYouTubePlayer);
      initScreenshotFeature(youtubePlayer, rightControls);
    }
  }, 1000);

  function initScreenshotFeature(player, rightControls) {
    // Create screenshot button with improved icon
    const screenshotBtn = document.createElement('button');
    screenshotBtn.className = 'ytp-button screenshot-btn';
    screenshotBtn.title = 'Take Screenshot';
    screenshotBtn.innerHTML = `
      <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
        <path d="M27,11h-4l-3-3h-6l-3,3H7c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V13C29,11.9,28.1,11,27,11z M17,24 c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S20.3,24,17,24z" fill="#fff"/>
        <circle cx="17" cy="18" r="4" fill="#fff"/>
      </svg>
    `;

    // Insert screenshot button in a better position to avoid overlapping
    const settingsButton = rightControls.querySelector('.ytp-settings-button');
    if (settingsButton) {
      rightControls.insertBefore(screenshotBtn, settingsButton);
    } else {
      rightControls.insertBefore(screenshotBtn, rightControls.firstChild);
    }

    // Check if dark mode is already enabled (from localStorage)
    const isDarkMode = localStorage.getItem('yt-screenshot-dark-mode') === 'true';
    
    // Create gallery container with header and controls
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'screenshot-gallery';
    if (isDarkMode) galleryContainer.classList.add('dark-mode');
    
    galleryContainer.innerHTML = `
      <div class="gallery-header">
        <div class="gallery-header-left">
          <h3>Screenshot Gallery</h3>
          <button class="dark-mode-toggle" title="${isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}">
            ${isDarkMode ? 
              '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0 s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>' : 
              '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>'
            }
          </button>
        </div>
        <div class="gallery-controls">
          <button class="view-toggle-btn grid-view-active" title="Toggle View Mode">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3,3h8v8H3V3z M13,3h8v8h-8V3z M3,13h8v8H3V13z M13,13h8v8h-8V13z"/>
            </svg>
          </button>
          <button class="clear-gallery-btn">Clear All</button>
        </div>
      </div>
      <div class="screenshot-grid-container">
        <div class="screenshot-items"></div>
      </div>
    `;
    
    // Find the right place to add the gallery
    const playerContainer = document.querySelector('#below');
    if (playerContainer) {
      playerContainer.insertAdjacentElement('afterbegin', galleryContainer);
    } else {
      document.getElementById('primary').appendChild(galleryContainer);
    }

    // Set up dark mode toggle
    const darkModeToggle = galleryContainer.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
      galleryContainer.classList.toggle('dark-mode');
      const newDarkModeState = galleryContainer.classList.contains('dark-mode');
      localStorage.setItem('yt-screenshot-dark-mode', newDarkModeState);
      
      // Update toggle icon
      darkModeToggle.innerHTML = newDarkModeState ? 
        '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0 s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>' : 
        '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>';
      
      darkModeToggle.title = newDarkModeState ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    // Set up view toggle functionality
    const viewToggleBtn = galleryContainer.querySelector('.view-toggle-btn');
    viewToggleBtn.addEventListener('click', () => {
      const screenshotContainer = galleryContainer.querySelector('.screenshot-grid-container');
      screenshotContainer.classList.toggle('row-view');
      viewToggleBtn.classList.toggle('grid-view-active');
      
      // Update the icon based on the current view
      if (viewToggleBtn.classList.contains('grid-view-active')) {
        viewToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M3,3h8v8H3V3z M13,3h8v8h-8V3z M3,13h8v8H3V13z M13,13h8v8h-8V13z"/>
          </svg>
        `;
        viewToggleBtn.title = "Switch to Row View";
      } else {
        viewToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M3,3h18v4H3V3z M3,10h18v4H3V10z M3,17h18v4H3V17z"/>
          </svg>
        `;
        viewToggleBtn.title = "Switch to Grid View";
      }
    });

    // Set up clear button functionality
    const clearBtn = galleryContainer.querySelector('.clear-gallery-btn');
    clearBtn.addEventListener('click', () => {
      const screenshotItems = galleryContainer.querySelector('.screenshot-items');
      screenshotItems.innerHTML = '';
    });

    // Get the video element
    const videoElement = document.querySelector('video');
    
    // Screenshot functionality
    screenshotBtn.addEventListener('click', () => {
      if (!videoElement) return;
      
      // Create a canvas and draw the current video frame
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Add timestamp to filename
      const timestamp = new Date().toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .substring(0, 19);
      const filename = `youtube-screenshot-${timestamp}.png`;
      
      // Convert canvas to Blob for better file handling
      canvas.toBlob((blob) => {
        // Create an object URL for the blob
        const blobUrl = URL.createObjectURL(blob);
        
        // Add screenshot to gallery with blob URL
        addScreenshotToGallery(blobUrl, canvas.toDataURL('image/png'), filename);
      }, 'image/png');
    });

    function addScreenshotToGallery(blobUrl, dataUrl, filename) {
      const screenshotItems = document.querySelector('.screenshot-items');
      
      // Create screenshot item
      const screenshotItem = document.createElement('div');
      screenshotItem.className = 'screenshot-item';
      
      // Create screenshot image
      const screenshotImg = document.createElement('img');
      screenshotImg.src = dataUrl; // Use dataUrl for display
      screenshotImg.alt = 'YouTube Screenshot';
      screenshotImg.setAttribute('draggable', 'true');
      
      // Store blob URL as data attribute
      screenshotImg.dataset.blobUrl = blobUrl;
      screenshotImg.dataset.filename = filename;
      screenshotImg.dataset.timestamp = Date.now(); // Add timestamp for sorting
      
      // Improved drag handling with better browser compatibility
      screenshotImg.addEventListener('dragstart', (e) => {
        // Apply visual styling
        screenshotItem.classList.add('being-dragged');
        
        const dt = e.dataTransfer;
        
        // Create a clone for the drag image to ensure consistent appearance
        const dragImageClone = screenshotImg.cloneNode(true);
        dragImageClone.style.position = 'absolute';
        dragImageClone.style.top = '-9999px';
        dragImageClone.style.width = '200px';
        dragImageClone.style.opacity = '0.8';
        document.body.appendChild(dragImageClone);
        
        // Set the drag image with the clone
        dt.setDragImage(dragImageClone, 10, 10);
        
        // Add data in multiple formats for cross-application compatibility
        dt.setData('text/plain', screenshotImg.dataset.filename);
        dt.setData('text/uri-list', screenshotImg.dataset.blobUrl);
        dt.setData('text/html', `<img src="${screenshotImg.src}" alt="YouTube Screenshot">`);
        
        // Fetch the actual blob for file transfer
        fetch(screenshotImg.dataset.blobUrl)
          .then(response => response.blob())
          .then(blob => {
            try {
              // Create a proper File object (better than raw blob)
              const file = new File([blob], screenshotImg.dataset.filename, { type: 'image/png' });
              dt.items.add(file);
            } catch (err) {
              console.warn('File API not fully supported, falling back', err);
              // Direct blob fallback if File API fails
              dt.items.add(blob);
            }
            
            // Remove the clone after it's been used
            setTimeout(() => {
              if (document.body.contains(dragImageClone)) {
                document.body.removeChild(dragImageClone);
              }
            }, 100);
          })
          .catch(err => {
            console.error('Failed to prepare blob for drag:', err);
            if (document.body.contains(dragImageClone)) {
              document.body.removeChild(dragImageClone);
            }
          });
        
        dt.effectAllowed = 'copy';
      });
      
      screenshotImg.addEventListener('dragend', (e) => {
        screenshotItem.classList.remove('being-dragged');
      });

          // Add dragstart and dragend event listeners to handle size changes
      screenshotImg.addEventListener('dragstart', (e) => {
        screenshotItem.classList.add('being-dragged'); // Add class to parent
      });

      screenshotImg.addEventListener('dragend', (e) => {
        screenshotItem.classList.remove('being-dragged'); // Remove class after drag
      });
      
      // Add a download button to screenshots
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'download-screenshot';
      downloadBtn.title = 'Download Screenshot';
      downloadBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      `;
      
      downloadBtn.addEventListener('click', async (e) => {
        e.stopPropagation();

          // Check if the browser supports direct blob downloads
        if (navigator.userAgent.toLowerCase().includes('android')) {
          // Convert the blob to a data URL for mobile compatibility
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          const reader = new FileReader();

          reader.onloadend = () => {
            const dataUrl = reader.result;

        // Create a download link
        // Create a temporary link for the data URL
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      reader.readAsDataURL(blob);
    } else {
      // Standard download for desktop browsers
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
      
      // Add image and download button to item
      screenshotItem.appendChild(screenshotImg);
      screenshotItem.appendChild(downloadBtn);
      
      // Add screenshot at the beginning of the gallery (newest first)
      if (screenshotItems.firstChild) {
        screenshotItems.insertBefore(screenshotItem, screenshotItems.firstChild);
      } else {
        screenshotItems.appendChild(screenshotItem);
      }
      
      // Optional: Add a subtle highlight effect for the new screenshot
      screenshotItem.classList.add('new-screenshot');
      setTimeout(() => {
        screenshotItem.classList.remove('new-screenshot');
      }, 1500);
    }
    
    
    // Observer for YouTube layout changes
    const bodyObserver = new MutationObserver(() => {
      if (!document.querySelector('.screenshot-gallery')) {
        const newPlayerContainer = document.querySelector('#below');
        if (newPlayerContainer) {
          newPlayerContainer.insertAdjacentElement('afterbegin', galleryContainer);
        }
      }
    });
    

    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
})();