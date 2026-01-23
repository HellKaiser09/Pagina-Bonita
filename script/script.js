// Script para Empanadas Dolado

document.addEventListener('DOMContentLoaded', () => {
    // 1. Welcome Toast
    showWelcomeToast();

    // 2. Highlight Table Row
    highlightCurrentDay();

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Product Modal Logic
    setupProductModal();
});

function showWelcomeToast() {
    // Crear elemento toast dinámicamente
    const toast = document.createElement('div');
    toast.className = 'toast-welcome';
    toast.innerText = '¡Bienvenido a Empanadas Dolado!';
    document.body.appendChild(toast);

    // Mostrar con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Ocultar después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        // Eliminar del DOM después de la transición
        setTimeout(() => toast.remove(), 600);
    }, 4000);
}

function highlightCurrentDay() {
    const days = ['Dom/Fer', 'Lun - Vie', 'Lun - Vie', 'Lun - Vie', 'Lun - Vie', 'Lun - Vie', 'Sábados'];
    const today = new Date().getDay();
    const todayString = days[today];

    const rows = document.querySelectorAll('#horarios table tbody tr');

    rows.forEach(row => {
        const dayCell = row.cells[0].innerText;
        if (dayCell.includes(todayString) || (todayString === 'Dom/Fer' && dayCell.includes('Domingos'))) {
            row.style.backgroundColor = '#F5E6CC';
            row.style.fontWeight = 'bold';
        }
    });
}

function setupProductModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-body h2');
    const modalDesc = document.querySelector('.modal-desc');
    const cards = document.querySelectorAll('#destacados .card');

    // Data real con imágenes
    const products = [
        {
            title: "Empanada de Carne",
            desc: "Jugosa carne picada a cuchillo, con la mezcla perfecta de cebolla, huevo, aceituna y nuestro mix secreto de especias. ¡La clásica que nunca falla!",
            imgUrl: "imagenes/12072023-empanadas-argentinas-de-sabores-express-BUHGBZQ5FVAITHTZSF3WOFNTFA.avif"
        },
        {
            title: "Empanada de Pollo",
            desc: "Pollo tiernizado cocinado a fuego lento, con cebollita de verdeo, pimientos asados y un toque de crema para darle esa suavidad única.",
            imgUrl: "imagenes/iStock-1437638745-Empanadas-de-pollo-scaled.jpg"
        },
        {
            title: "Empanada Caprese",
            desc: "Una explosión de frescura: tomates seleccionados, mozzarella de primera calidad, hojas de albahaca fresca y un hilo de aceite de oliva.",
            imgUrl: "imagenes/empanada-de-IWWICY2OKVGGNMBMM6QB5LMQFY.avif"
        }
    ];

    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            if (products[index]) {
                const p = products[index];

                // Actualizar contenido del modal
                modalTitle.innerText = p.title;
                modalDesc.innerText = p.desc;

                // Actualizar imagen
                modalImage.style.backgroundImage = `url('${p.imgUrl}')`;
                modalImage.className = 'modal-image'; // Reset classes

                // Mostrar modal
                modal.classList.remove('hidden');
            }
        });
    });

    // Cerrar modal con botón X
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Cerrar modal con click afuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}
