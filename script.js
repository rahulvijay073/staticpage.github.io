// Dress designs data with multiple angle images and categories
const dressDesigns = [
    
    {
        id: 1,
        name: "Nighty Comfort",
        category: "Nighty",
        images: [
            "images/1/1.png",
            "images/1/2.png",
            "images/1/3.png",
            "images/1/4.png"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 2,
        name: "Viscose House Coat",
        category: "Nighty",
        images: [
            "images/2/1.png",
            "images/2/2.png",
            "images/2/3.png",
            "images/2/4.png",
			"images/2/5.png"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 3,
        name: "Fancy Embroidery",
        category: "Nighty",
        images: [
            "images/3/1.jpg",
            "images/3/2.jpg",
            "images/3/3.jpg",
            "images/3/4.jpg",
			"images/3/5.jpg",
            "images/3/6.jpg",
            "images/3/7.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 4,
        name: "Maxi Frock Style",
        category: "Nighty",
        images: [
            "images/4/1.jpg",
            "images/4/2.jpg",
            "images/4/3.jpg",
            "images/4/4.jpg",
			"images/4/5.jpg",
            "images/4/6.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 5,
        name: "Concealed Nursing Access",
        category: "Nighty",
        images: [
            "images/5/1.jpg",
            "images/5/2.jpg",
            "images/5/3.jpg",
            "images/5/4.jpg",
			"images/5/5.jpg",
            "images/5/6.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 6,
        name: "V-Neck",
        category: "Nighty",
        images: [
            "images/6/1.jpg",
            "images/6/2.jpg",
            "images/6/3.jpg",
            "images/6/4.jpg",
			"images/6/5.jpg",
            "images/6/6.jpg",
			"images/6/7.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 7,
        name: "V-Neck",
        category: "Nighty",
        images: [
            "images/7/1.jpg",
            "images/7/2.jpg",
            "images/7/3.jpg",
            "images/7/4.jpg",
			"images/7/5.jpg",
            "images/7/6.jpg",
			"images/7/7.jpg",
			"images/7/8.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
	{
        id: 8,
        name: "Night Suit Sets",
        category: "Nighty",
        images: [
            "images/8/1.jpg",
            "images/8/2.jpg",
            "images/8/3.jpg",
            "images/8/4.jpg",
			"images/8/5.jpg"
        ],
        colors: [
            { name: "Red", value: "#FF0000" },
            { name: "Blue", value: "#0000FF" },
            { name: "Green", value: "#00FF00" },
            { name: "Black", value: "#000000" },
            { name: "White", value: "#FFFFFF" }
        ]
    },
];


const ITEMS_PER_PAGE = 4;
let currentImages = [];
let currentImageIndex = 0;
let currentCategory = 'All';
let currentPage = 1;

function getCategories() {
    const cats = dressDesigns.map(d => d.category);
    return ['All', ...Array.from(new Set(cats))];
}

function filterDesigns() {
    return currentCategory === 'All'
        ? dressDesigns
        : dressDesigns.filter(d => d.category === currentCategory);
}

function paginateDesigns(designs) {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return designs.slice(start, start + ITEMS_PER_PAGE);
}

function renderDesigns() {
    const designsGrid = document.querySelector('.designs-grid');
    designsGrid.innerHTML = '';
    const filtered = filterDesigns();
    const paginated = paginateDesigns(filtered);
    paginated.forEach((design, idx) => {
        const card = document.createElement('div');
        card.className = 'design-card';
        card.innerHTML = `
            <img src="${design.images[0]}" alt="${design.name}">
            <div class="info">
                <h3>${design.name}</h3>
                <span class="category-label">${design.category}</span>
            </div>
        `;
        card.addEventListener('click', () => showGallery(design.images));
        designsGrid.appendChild(card);
    });
    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    const paginationDiv = document.getElementById('pagination');
    if (!paginationDiv) return;
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderDesigns();
        });
        paginationDiv.appendChild(btn);
    }
}

function renderCategoryFilter() {
    const filterDiv = document.getElementById('category-filter');
    filterDiv.innerHTML = '';
    const categories = getCategories();
    const row = document.createElement('div');
    row.className = 'category-row';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
        btn.addEventListener('click', () => {
            currentCategory = cat;
            currentPage = 1;
            renderCategoryFilter();
            renderDesigns();
        });
        row.appendChild(btn);
    });
    filterDiv.appendChild(row);
}

function showGallery(images) {
    currentImages = images;
    currentImageIndex = 0;
    renderGallery();
    // On mobile, scroll the gallery into view
    if (window.innerWidth <= 768) {
        const viewer = document.getElementById('model-viewer');
        if (viewer) {
            viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function renderGallery() {
    const viewer = document.getElementById('model-viewer');
    viewer.innerHTML = '';
    if (currentImages.length > 0) {
        // Create a container for the image and color overlay
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.id = 'gallery-img';
        img.src = currentImages[currentImageIndex];
        img.alt = `Dress angle ${currentImageIndex + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        
        // Create color overlay div
        const colorOverlay = document.createElement('div');
        colorOverlay.className = 'color-overlay';
        colorOverlay.style.display = 'none';
        
        imageContainer.appendChild(img);
        imageContainer.appendChild(colorOverlay);
        viewer.appendChild(imageContainer);

        // Add color selection panel
        const colorPanel = document.createElement('div');
        colorPanel.className = 'color-panel';
        
        const currentDesign = dressDesigns.find(d => d.images.includes(currentImages[0]));
        if (currentDesign && currentDesign.colors) {
            const colorOptions = document.createElement('div');
            colorOptions.className = 'color-options';
            
            currentDesign.colors.forEach(color => {
                const colorBtn = document.createElement('button');
                colorBtn.className = 'color-btn';
                colorBtn.style.backgroundColor = color.value;
                colorBtn.title = color.name;
                colorBtn.addEventListener('click', () => {
                    colorOverlay.style.display = 'block';
                    colorOverlay.style.backgroundColor = color.value;
                });
                colorOptions.appendChild(colorBtn);
            });
            
            colorPanel.appendChild(colorOptions);
            viewer.appendChild(colorPanel);
        }

        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'gallery-nav';
        navButtons.innerHTML = `
            <button class="nav-btn prev-btn" title="Previous">←</button>
            <button class="nav-btn next-btn" title="Next">→</button>
        `;
        viewer.appendChild(navButtons);

        // Add event listeners for navigation buttons
        const prevBtn = navButtons.querySelector('.prev-btn');
        const nextBtn = navButtons.querySelector('.next-btn');

        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            img.src = currentImages[currentImageIndex];
            // Reset color overlay when changing images
            colorOverlay.style.display = 'none';
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            img.src = currentImages[currentImageIndex];
            // Reset color overlay when changing images
            colorOverlay.style.display = 'none';
        });

        // Add touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;

        imageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        imageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe right - show previous image
                    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                } else {
                    // Swipe left - show next image
                    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                }
                img.src = currentImages[currentImageIndex];
                // Reset color overlay when changing images
                colorOverlay.style.display = 'none';
            }
        }

        // Enable click-to-zoom overlay
        if (window.mediumZoom) {
            mediumZoom(img, { background: 'rgba(44,62,80,0.85)' });
        }
    }
}

// Helper function to calculate hue rotation for color change
function getHueRotation(color) {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Calculate hue
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue = 0;
    
    if (max === min) {
        hue = 0;
    } else if (max === r) {
        hue = ((g - b) / (max - min)) * 60;
    } else if (max === g) {
        hue = ((b - r) / (max - min) + 2) * 60;
    } else {
        hue = ((r - g) / (max - min) + 4) * 60;
    }
    
    return `${hue}deg`;
}

// Zoom overlay logic
function showZoomOverlay(imgUrl) {
    // Remove any existing overlay
    const existing = document.getElementById('zoom-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'zoom-overlay';
    overlay.innerHTML = `
        <div class="zoom-overlay-content">
            <span class="zoom-close" title="Close">&times;</span>
            <img src="${imgUrl}" alt="Zoomed Image">
        </div>
    `;
    document.body.appendChild(overlay);

    // Close on click (outside image or on close icon)
    overlay.onclick = (e) => {
        if (e.target === overlay || e.target.classList.contains('zoom-close')) {
            overlay.remove();
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Add filter and pagination containers if not present
    let filterDiv = document.getElementById('category-filter');
    if (!filterDiv) {
        filterDiv = document.createElement('div');
        filterDiv.id = 'category-filter';
        document.querySelector('.designs-section').insertBefore(filterDiv, document.querySelector('.designs-container'));
    }
    let paginationDiv = document.getElementById('pagination');
    if (!paginationDiv) {
        paginationDiv = document.createElement('div');
        paginationDiv.id = 'pagination';
        document.querySelector('.designs-section').appendChild(paginationDiv);
    }

    // Remove Three.js controls if present
    const controlsDiv = document.querySelector('.controls');
    if (controlsDiv) controlsDiv.innerHTML = '';

    renderCategoryFilter();
    renderDesigns();

    // Show first design by default
    if (dressDesigns.length > 0) showGallery(dressDesigns[0].images);
}); 