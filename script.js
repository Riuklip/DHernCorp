document.addEventListener('DOMContentLoaded', () => {
    // 1. Datos de Negocio
    const businessData = {
        businesses: [
            {
                id: 1,
                title: "D.L.H. Home Improvements",
                shortDesc: "Expert craftsmanship for residential renovations, ensuring your home reflects your vision.",
                imageUrl: "https://images.unsplash.com/photo-1618832515490-e181c4794a45?q=80&w=1170&auto=format&fit=crop",
                extendedInfo: {
                    description: "Specializing in kitchen and bathroom remodels, room additions, and whole-house renovations.",
                    listItems: ["Kitchen & Bath Remodels", "Room Additions", "5-year warranty"]
                },
                contactEmail: "homeimprovements@dherncorp.com"
            },
            {
                id: 2,
                title: "S&DH Cleaning Services",
                shortDesc: "Professional residential and commercial cleaning with a focus on detail and trust.",
                imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1170&auto=format&fit=crop",
                extendedInfo: {
                    description: "Eco-friendly cleaning solutions using non-toxic products safe for children and pets.",
                    listItems: ["Residential & Commercial", "Move-in/Move-out", "Eco-friendly products"]
                },
                contactEmail: "cleaning@dherncorp.com"
            },
            {
                id: 3,
                title: "Hernandez Family Trust",
                shortDesc: "Strategic asset management and legacy planning for the future of your family.",
                imageUrl: null, // Sin imagen, usará placeholder
                extendedInfo: {
                    description: "Comprehensive wealth management, estate planning and trust administration.",
                    listItems: ["Estate Planning", "Investment Management", "Multi-generational wealth"]
                },
                contactEmail: "trust@dherncorp.com"
            },
            {
                id: 4,
                title: "TeamHern Fitness",
                shortDesc: "Empowering health and performance through personalized training programs.",
                imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=600&auto=format&fit=crop",
                extendedInfo: {
                    description: "State-of-the-art facility with certified trainers and nutrition counseling.",
                    listItems: ["Personal Training", "Group Classes", "Nutrition Plans"]
                },
                contactEmail: "fitness@dherncorp.com"
            },
            {
                id: 5,
                title: "Moss Outdoor Services",
                shortDesc: "Premium landscaping and outdoor maintenance to elevate your property.",
                imageUrl: null,
                extendedInfo: {
                    description: "Full-service landscaping, design, and maintenance for residential properties.",
                    listItems: ["Landscape Design", "Lawn Maintenance", "Snow Removal"]
                },
                contactEmail: "landscaping@dherncorp.com"
            },
            {
                id: 6,
                title: "Amiel's Holding (LLC)",
                shortDesc: "Corporate investment vehicle managing the diverse interests of the portfolio.",
                imageUrl: null,
                extendedInfo: {
                    description: "Overseeing investments across real estate, technology, and sustainable energy.",
                    listItems: ["Real Estate", "Tech Startups", "Sustainable Growth"]
                },
                contactEmail: "investments@dherncorp.com"
            }
        ]
    };

    // 2. Elementos DOM
    const carouselContainer = document.getElementById('business-carousel');
    const indicatorBtns = document.querySelectorAll('.indicator-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = businessData.businesses.length;

    // 3. Generar Tarjetas
    function generateCards() {
        carouselContainer.innerHTML = '';
        
        businessData.businesses.forEach(biz => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            
            // Imagen o Placeholder
            let imgHTML = biz.imageUrl 
                ? `<img src="${biz.imageUrl}" alt="${biz.title}" loading="lazy">` 
                : `<div class="missing-img-placeholder"><span>${biz.title}</span></div>`;

            // Lista
            const listHTML = biz.extendedInfo.listItems.map(item => `<li>${item}</li>`).join('');

            card.innerHTML = `
                <div class="card-content">
                    <div class="card-image">${imgHTML}</div>
                    <div class="card-body">
                        <h3>${biz.title}</h3>
                        <p>${biz.shortDesc}</p>
                        
                        <button class="info-toggle" aria-expanded="false">
                            <i class="fas fa-chevron-down"></i> More Details
                        </button>
                        
                        <div class="extended-info">
                            <p>${biz.extendedInfo.description}</p>
                            <ul>${listHTML}</ul>
                        </div>
                        
                        <a href="mailto:${biz.contactEmail}" class="contact-btn">Contact Team</a>
                    </div>
                </div>
            `;
            carouselContainer.appendChild(card);
            
            // Event Listener para el botón "More Details" dentro de esta tarjeta
            const toggleBtn = card.querySelector('.info-toggle');
            const extendedInfo = card.querySelector('.extended-info');
            const icon = toggleBtn.querySelector('i');
            
            toggleBtn.addEventListener('click', () => {
                const isExpanded = extendedInfo.classList.contains('active');
                
                // Cerrar otros (opcional, buena UX)
                document.querySelectorAll('.extended-info').forEach(el => el.classList.remove('active'));
                document.querySelectorAll('.info-toggle i').forEach(el => el.className = 'fas fa-chevron-down');
                document.querySelectorAll('.info-toggle').forEach(el => el.innerHTML = '<i class="fas fa-chevron-down"></i> More Details');

                if (!isExpanded) {
                    extendedInfo.classList.add('active');
                    toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Less Details';
                }
            });
        });
    }

    // 4. Lógica de Movimiento del Carrusel (LA CORRECCIÓN CLAVE)
    function updateCarousel() {
        // Usamos porcentaje en lugar de píxeles fijos.
        // -100% mueve una diapositiva completa a la izquierda.
        const percentage = -(currentSlide * 100); 
        carouselContainer.style.transform = `translateX(${percentage}%)`;

        // Actualizar botones superiores
        indicatorBtns.forEach((btn, idx) => {
            if (idx === currentSlide) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // 5. Event Listeners
    
    // Botones indicadores (superiores)
    indicatorBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Flechas de navegación (si existen)
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch / Swipe (Móvil)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchEndX - touchStartX > 50) prevSlide();
    }

    // Menú Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 6. Inicialización
    generateCards();
    updateCarousel();
});