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
                contactEmail: "eliclpere@gmail.com"
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
                contactEmail: "eliclpere@gmail.com"
            },
            {
                id: 3,
                title: "Hernandez Family Trust",
                shortDesc: "Strategic asset management and legacy planning for the future of your family.",
                imageUrl:"Images/handshake.png", // Sin imagen, usará placeholder
                extendedInfo: {
                    description: "Comprehensive wealth management, estate planning and trust administration.",
                    listItems: ["Estate Planning", "Investment Management", "Multi-generational wealth"]
                },
                contactEmail: "eliclpere@gmail.com"
            },
            {
                id: 4,
                title: "TeamHern Fitness",
                shortDesc: "Empowering health and performance through personalized training programs.",
                imageUrl: "Images/samuel-girven-fqMu99l8sqo-unsplash(1).jpg",
                extendedInfo: {
                    description: "State-of-the-art facility with certified trainers and nutrition counseling.",
                    listItems: ["Personal Training", "Group Classes", "Nutrition Plans"]
                },
                contactEmail: "eliclpere@gmail.com"
            },
            {
                id: 5,
                title: "Moss Outdoor Services",
                shortDesc: "Premium landscaping and outdoor maintenance to elevate your property.",
                imageUrl: "Images/doug-vos-HEHjFvFHpr8-unsplash.jpg",
                extendedInfo: {
                    description: "Full-service landscaping, design, and maintenance for residential properties.",
                    listItems: ["Landscape Design", "Lawn Maintenance", "Snow Removal"]
                },
                contactEmail: "eliclpere@gmail.com"
            },
            {
                id: 6,
    title: "Amiel's Holdings (LLC)",
    shortDesc: "Your trusted partner for stress-free residential and commercial moving services.",
    imageUrl: "Images/camion.png",
    extendedInfo: {
        "description": "Providing professional relocation solutions with a focus on safety, efficiency, and reliability across the nation.",
        "listItems": [
            "Residential & Commercial Moving",
            "Packing & Unpacking Services",
            "Secure Short-term Storage"
        ]
    },
    contactEmail: "eliclpere@gmail.com"
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
        if (touchStartX - touchEndX > 80) nextSlide();
        if (touchEndX - touchStartX > 80) prevSlide();
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
    /* --- RESEÑAS / TESTIMONIALS LOGIC --- */
    
    // 1. Datos iniciales "Fake"
// 1. Datos iniciales "Fake" (Ampliado para no repetir)
    const reviewsData = [
        {
            name: "Sarah Jenkins",
            rating: 5,
            text: "D.L.H. Home Improvements transformed our kitchen completely. The team was professional, clean, and finished on time. Highly recommended!"
        },
        {
            name: "Michael Rodriguez",
            rating: 5,
            text: "I've been using S&DH Cleaning for my office for a year now. The attention to detail is unmatched. Best cleaning service in the area."
        },
        {
            name: "Emily Clark",
            rating: 4,
            text: "TeamHern Fitness helped me get back in shape after my surgery. The personalized plan was exactly what I needed. Great trainers!"
        },
        {
            name: "David H.",
            rating: 5,
            text: "The Family Trust planning service gave us peace of mind. Very knowledgeable team that explained complex terms simply."
        },
        {
            name: "Amanda Lewis",
            rating: 5,
            text: "Moss Outdoor Services did an amazing job with our landscaping design. Our curb appeal has never been better."
        },
        {
            name: "Robert Turner",
            rating: 5,
            text: "Professionalism runs in the family. I've used both their cleaning and outdoor services, and the quality is consistent across the board."
        },
        {
            name: "Jessica P.",
            rating: 4,
            text: "Reliable and trustworthy. Had a small issue with scheduling once, but they resolved it immediately and gave me a discount."
        },
        {
            name: "Carlos M.",
            rating: 5,
            text: "The renovation crew respected my home and my time. They cleaned up every day before leaving. A+ service."
        },
        {
            name: "Linda White",
            rating: 5,
            text: "I never thought I'd enjoy working out, but the group classes at TeamHern are actually fun. I've lost 15lbs so far!"
        },
        {
            name: "James Wilson",
            rating: 5,
            text: "Setting up a trust seemed daunting, but the Hernandez team made it seamless. I feel much more secure about my family's future."
        },
        {
            name: "Karen Miller",
            rating: 5,
            text: "Eco-friendly cleaning products were a must for me because of my dogs. S&DH delivered exactly what they promised."
        },
        {
            name: "Brian Scott",
            rating: 4,
            text: "Great lawn maintenance. They show up on time and the lines are always straight. Good value for the price."
        },
        {
            name: "Patricia Green",
            rating: 5,
            text: "They built a beautiful deck for our backyard. We spend every evening out there now. Thank you D.L.H.!"
        },
        {
            name: "Tom Baker",
            rating: 5,
            text: "Honest business people. Hard to find that these days. Whether it's advice or a service, they give it to you straight."
        },
        {
            name: "Sophie Turner",
            rating: 5,
            text: "My move-out cleaning was perfect. Got my full security deposit back thanks to their deep cleaning service."
        },
        {
            name: "Kevin Adams",
            rating: 5,
            text: "Investment guidance was spot on. They look at the big picture, not just quick wins."
        },
        {
            name: "Rebecca N.",
            rating: 4,
            text: "The snow removal service saved me this winter. My driveway was clear before I even woke up for work."
        },
        {
            name: "Daniel Lee",
            rating: 5,
            text: "Renovated our master bath. It feels like a spa now. The tile work is exquisite."
        },
        {
            name: "Grace Kim",
            rating: 5,
            text: "I appreciate a company that holds Christian values. It shows in how they treat their customers and their staff."
        },
        {
            name: "Mark Johnson",
            rating: 5,
            text: "Top tier service from start to finish. Highly responsive communication."
        }
    ];

    const reviewsTrack = document.getElementById('reviews-track');
    let reviewIndex = 0;
    let reviewsInterval;

    // 2. Función para renderizar las estrellas (Visualización)
    function getStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>'; // Estrella llena
            } else {
                stars += '<i class="far fa-star"></i>'; // Estrella vacía
            }
        }
        return stars;
    }

    // 3. Renderizar Reseñas en el DOM
    function renderReviews() {
        reviewsTrack.innerHTML = '';
        reviewsData.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-stars">${getStarsHTML(review.rating)}</div>
                <p class="review-text">"${review.text}"</p>
                <p class="review-author">- ${review.name}</p>
            `;
            reviewsTrack.appendChild(card);
        });
    }

    // 4. Lógica del Slider Automático (SetInterval)
    function startReviewSlider() {
        // Limpiamos intervalo previo para evitar duplicados si se llama varias veces
        if (reviewsInterval) clearInterval(reviewsInterval);
        
        reviewsInterval = setInterval(() => {
            reviewIndex++;
            // Si llegamos al final, volvemos al principio suavemente
            if (reviewIndex >= reviewsData.length) {
                reviewIndex = 0;
            }
            updateReviewPosition();
        }, 3000); // 3 segundos
    }

    function updateReviewPosition() {
        const percentage = -(reviewIndex * 100);
        reviewsTrack.style.transform = `translateX(${percentage}%)`;
    }

    // Pausar el slider cuando el mouse está encima (Mejora de UX)
    const reviewsDisplay = document.querySelector('.reviews-display');
    reviewsDisplay.addEventListener('mouseenter', () => clearInterval(reviewsInterval));
    reviewsDisplay.addEventListener('mouseleave', startReviewSlider);

    // 5. Lógica del Formulario (Añadir reseña en tiempo real)
    
    // a) Manejo de estrellas en el formulario (Input visual)
    const starInputs = document.querySelectorAll('.star-rating-input i');
    const ratingValueInput = document.getElementById('review-rating');

    starInputs.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingValueInput.value = value;
            
            // Actualizar visualmente
            starInputs.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-value'));
                if (sVal <= value) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Inicializar estrellas del formulario en 5
    starInputs.forEach(s => s.classList.add('fas', 'active'));

    // b) Submit del formulario
    const reviewForm = document.getElementById('review-form');
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página

        // Capturar datos
        const name = document.getElementById('review-name').value;
        const text = document.getElementById('review-text').value;
        const rating = parseInt(document.getElementById('review-rating').value);

        // Crear objeto
        const newReview = {
            name: name,
            text: text,
            rating: rating
        };

        // Añadir al INICIO del array (unshift) para que sea la primera en verse
        reviewsData.unshift(newReview);

        // Re-renderizar carrusel
        renderReviews();
        
        // Resetear la posición al inicio para ver la nueva reseña
        reviewIndex = 0;
        updateReviewPosition();

        // Reiniciar el timer para que el usuario tenga tiempo de ver su reseña
        clearInterval(reviewsInterval);
        startReviewSlider();

        // Limpiar formulario y dar feedback visual
        reviewForm.reset();
        
        // Reset estrellas visuales a 5
        starInputs.forEach(s => s.classList.add('fas', 'active'));
        ratingValueInput.value = 5;

        alert('Thank you! Your review has been posted.');
    });

    // Inicializar Reseñas
    renderReviews();
    startReviewSlider();

    //Formulario de contacto
    emailjs.init("SjO1Xf_HPHQgbHemB");
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validación
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !service || !message) {
      alert("Please, complete all the required data");
      return;
    }

    // Envío con EmailJS
    emailjs.send("service_2cgi42s","template_8aho7et");
    emailjs
      .send("service_2cgi42s", "template_8aho7et", {
        name: name,
        email: email,
        message: `I need a service from:${service}\n\nDetails:${message}\n\n`, // Formato mejorado
      })
      .then(
        () => {
          alert("¡Message Sent! We will contact you soon, thanks.");
          contactForm.reset();
        },
        (error) => {
          console.error("Error de EmailJS:", error);
          alert("Sending Error. Please try again.");
        }
      );
  });
}
    

});
