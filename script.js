// Global state
let allFormations = [];
let filteredFormations = [];
let currentDate = new Date();
let categoryColors = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadFormations();
    populateDynamicFilters();
    setupEventListeners();
    renderListeView();
});

// Load formations from JSON file
async function loadFormations() {
    try {
        const response = await fetch('formations.json');
        if (!response.ok) {
            throw new Error('Failed to load formations');
        }
        allFormations = await response.json();
        // Filter out past formations by default (only show future or undated formations)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        filteredFormations = allFormations.filter(formation => {
            if (!formation.date || formation.date === '') {
                return true; // Keep formations without dates
            }
            const formationDate = new Date(formation.date);
            return formationDate >= today; // Only keep future formations
        });
    } catch (error) {
        console.error('Error loading formations:', error);
        showError('Erreur lors du chargement des formations');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Filter controls
    document.getElementById('filter-type').addEventListener('change', applyFilters);
    document.getElementById('filter-categorie').addEventListener('change', applyFilters);
    document.getElementById('filter-niveau').addEventListener('change', applyFilters);
    document.getElementById('filter-format').addEventListener('change', applyFilters);
    document.getElementById('filter-certifiante').addEventListener('change', applyFilters);
    document.getElementById('filter-search').addEventListener('input', applyFilters);

    // Reset filters button
    document.querySelector('.btn-reset-filters').addEventListener('click', resetFilters);

    // Calendar controls
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
}

// Generate dynamic colors for categories
function generateCategoryColors() {
    const categories = [...new Set(allFormations.map(f => f.categorie))].sort();
    
    // Define color palette - vibrant and distinct colors
    const colorPalette = [
        { border: '#3498db', background: '#ebf5fb', button: '#2980b9' }, // Blue
        { border: '#e74c3c', background: '#fadbd8', button: '#c0392b' }, // Red
        { border: '#2ecc71', background: '#d5f4e6', button: '#27ae60' }, // Green
        { border: '#f39c12', background: '#fef5e7', button: '#d68910' }, // Orange
        { border: '#9b59b6', background: '#f4ecf7', button: '#7d3c98' }, // Purple
        { border: '#1abc9c', background: '#d1f2eb', button: '#16a085' }, // Turquoise
        { border: '#e67e22', background: '#fdebd0', button: '#ca6f1e' }, // Carrot
        { border: '#34495e', background: '#eaecee', button: '#2c3e50' }, // Dark Gray
        { border: '#16a085', background: '#d0ece7', button: '#138d75' }, // Teal
        { border: '#8e44ad', background: '#ebdef0', button: '#7d3c98' }, // Violet
    ];
    
    categories.forEach((category, index) => {
        categoryColors[category] = colorPalette[index % colorPalette.length];
    });
}

// Populate dynamic filter options
function populateDynamicFilters() {
    // Get unique categories
    const categories = [...new Set(allFormations.map(f => f.categorie))].sort();
    
    const categorieSelect = document.getElementById('filter-categorie');
    categorieSelect.innerHTML = '<option value="">Toutes</option>';
    
    categories.forEach(categorie => {
        const option = document.createElement('option');
        option.value = categorie;
        option.textContent = categorie;
        categorieSelect.appendChild(option);
    });
    
    // Get unique niveau values from formations
    const niveaux = [...new Set(allFormations.map(f => f.niveau))].sort();
    
    const niveauSelect = document.getElementById('filter-niveau');
    // Keep the "Tous" option
    niveauSelect.innerHTML = '<option value="">Tous</option>';
    
    // Add all unique niveau values
    niveaux.forEach(niveau => {
        const option = document.createElement('option');
        option.value = niveau;
        option.textContent = niveau;
        niveauSelect.appendChild(option);
    });
    
    // Generate colors for categories
    generateCategoryColors();
}

// Switch between views
function switchView(viewName) {
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    const targetView = document.getElementById(`${viewName}-view`);
    targetView.classList.add('active');

    // Render the appropriate view
    if (viewName === 'liste') {
        renderListeView();
    } else if (viewName === 'calendrier') {
        renderCalendrierView();
    }
}

// Apply filters
function applyFilters() {
    const typeFilter = document.getElementById('filter-type').value;
    const categorieFilter = document.getElementById('filter-categorie').value;
    const niveauFilter = document.getElementById('filter-niveau').value;
    const formatFilter = document.getElementById('filter-format').value;
    const certifianteFilter = document.getElementById('filter-certifiante').value;
    const searchFilter = document.getElementById('filter-search').value.toLowerCase();

    filteredFormations = allFormations.filter(formation => {
        // Type filter
        if (typeFilter && formation.type !== typeFilter) return false;

        // Categorie filter
        if (categorieFilter && formation.categorie !== categorieFilter) return false;

        // Niveau filter
        if (niveauFilter && formation.niveau !== niveauFilter) return false;

        // Format filter
        if (formatFilter && formation.format !== formatFilter) return false;

        // Certifiante filter
        if (certifianteFilter) {
            const isCertifiante = certifianteFilter === 'true';
            if (formation.certifiante !== isCertifiante) return false;
        }

        // Search filter
        if (searchFilter) {
            const searchText = `${formation.titre} ${formation.description} ${formation.categorie}`.toLowerCase();
            if (!searchText.includes(searchFilter)) return false;
        }

        return true;
    });

    // Re-render current view
    const activeView = document.querySelector('.view.active');
    if (activeView.id === 'liste-view') {
        renderListeView();
    } else {
        renderCalendrierView();
    }
}

// Reset filters
function resetFilters() {
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-categorie').value = '';
    document.getElementById('filter-niveau').value = '';
    document.getElementById('filter-format').value = '';
    document.getElementById('filter-certifiante').value = '';
    document.getElementById('filter-search').value = '';
    applyFilters();
}

// Render Liste View
function renderListeView() {
    const container = document.getElementById('liste-container');
    const resultsCount = document.getElementById('results-count');

    // Update results count
    resultsCount.textContent = `${filteredFormations.length} résultat${filteredFormations.length > 1 ? 's' : ''}`;

    // Clear container
    container.innerHTML = '';

    if (filteredFormations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>Aucune formation ou conférence trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
            </div>
        `;
        return;
    }

    // Create cards
    filteredFormations.forEach(formation => {
        const card = createFormationCard(formation);
        container.appendChild(card);
    });
}

// Create formation card
function createFormationCard(formation) {
    const card = document.createElement('div');
    card.className = 'formation-card';

    const formattedDate = formatDate(formation.date);
    const typeClass = formation.type.toLowerCase();
    
    // Get category colors
    const colors = categoryColors[formation.categorie] || { border: '#667eea', background: '#f0f4ff', button: '#5568d3' };
    
    // Apply category border color
    card.style.borderColor = colors.border;
    card.style.borderWidth = '3px';
    
    // Check if location should be displayed (only for Présentiel or Hybride)
    const showLocation = (formation.format === 'Présentiel' || formation.format === 'Hybride') && formation.localisation;

    card.innerHTML = `
        <div class="card-header">
            <span class="card-type ${typeClass}">${formation.type}</span>
            ${formation.certifiante ? '<span class="card-certifiante">✓ Certifiante</span>' : ''}
        </div>
        <h3 class="card-title">${formation.titre}</h3>
        <div class="card-categorie" style="color: ${colors.border};">${formation.categorie}</div>
        <p class="card-description">${formation.description}</p>
        <div class="card-info">
            <div class="info-item">
                <strong>📅</strong>
                <span>${formattedDate}</span>
            </div>
            <div class="info-item">
                <strong>⏰</strong>
                <span>${formation.horaire}</span>
            </div>
            <div class="info-item">
                <strong>⏱️</strong>
                <span>${formation.duree}</span>
            </div>
            <div class="info-item">
                <strong>📊</strong>
                <span>${formation.niveau}</span>
            </div>
            <div class="info-item">
                <strong>💰</strong>
                <span>${formation.prix}</span>
            </div>
            <div class="info-item">
                <strong>📍</strong>
                <span>${formation.format}</span>
            </div>
            ${showLocation ? `
                <div class="info-item">
                    <strong>🗺️</strong>
                    <span>${formation.localisation}</span>
                </div>
            ` : ''}
        </div>
        ${formation.modules.length > 0 ? `
            <div class="card-modules">
                <strong>Modules:</strong>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem; color: #666;">
                    ${formation.modules.map(m => `<li>${m}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        ${formation.tags.length > 0 ? `
            <div class="card-tags">
                ${formation.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        ` : ''}
        <div class="card-actions">
            <a href="${formation.lien}" class="btn-card btn-primary" target="_blank" rel="noopener" style="background-color: ${colors.button}; border-color: ${colors.button};">En savoir plus</a>
        </div>
    `;

    return card;
}

// Render Calendrier View
function renderCalendrierView() {
    renderCalendar();
    renderCalendarEvents();
}

// Render calendar grid
function renderCalendar() {
    const container = document.getElementById('calendar-container');
    const monthLabel = document.getElementById('current-month');

    // Update month label
    const monthName = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    monthLabel.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Create calendar grid
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
    const daysInMonth = lastDay.getDate();

    // Get previous month's last days
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    // Day headers
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.innerHTML = `<div class="calendar-day-number">${prevMonthLastDay - i}</div>`;
        grid.appendChild(day);
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === today.toDateString();

        // Add events for this day
        const dayEvents = getEventsForDate(date);
        const hasEvents = dayEvents.length > 0;
        
        dayElement.className = `calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`;
        dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;

        // Add event indicators
        if (hasEvents) {
            const eventsDiv = document.createElement('div');
            eventsDiv.className = 'calendar-day-events';
            eventsDiv.innerHTML = `${dayEvents.length} événement${dayEvents.length > 1 ? 's' : ''}`;
            dayElement.appendChild(eventsDiv);
        }

        // Make day clickable to show events
        if (hasEvents) {
            dayElement.addEventListener('click', () => showDayEvents(date, dayEvents));
        }

        grid.appendChild(dayElement);
    }

    // Next month days
    const remainingDays = 42 - (firstDayOfWeek + daysInMonth); // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        grid.appendChild(dayElement);
    }

    container.innerHTML = '';
    container.appendChild(grid);
}

// Show events for a specific day
function showDayEvents(date, events) {
    const container = document.getElementById('calendar-events-list');
    const dateStr = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    container.innerHTML = `<h3>Événements du ${dateStr}</h3>`;
    
    events.forEach(formation => {
        const item = document.createElement('div');
        item.className = 'calendar-event-item';
        item.innerHTML = `
            <h4>${formation.titre}</h4>
            <p><strong>Horaire:</strong> ${formation.horaire}</p>
            <p><strong>Type:</strong> ${formation.type} | <strong>Format:</strong> ${formation.format}</p>
            <p><strong>Prix:</strong> ${formation.prix}</p>
            <div style="margin-top: 0.5rem;">
                <a href="${formation.lien}" class="btn-card btn-primary" target="_blank" rel="noopener" style="display: inline-block; padding: 0.5rem 1rem;">En savoir plus</a>
            </div>
        `;
        container.appendChild(item);
    });
}

// Render calendar events list
function renderCalendarEvents() {
    const container = document.getElementById('calendar-events-list');
    
    // Get events for current month
    const monthEvents = filteredFormations.filter(formation => {
        if (!formation.date || formation.date === '') return false;
        const formationDate = new Date(formation.date);
        return formationDate.getMonth() === currentDate.getMonth() &&
               formationDate.getFullYear() === currentDate.getFullYear();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    if (monthEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3>Aucun événement ce mois-ci</h3>
            </div>
        `;
        return;
    }

    container.innerHTML = '<h3>Événements du mois</h3>';
    
    monthEvents.forEach(formation => {
        const item = document.createElement('div');
        item.className = 'calendar-event-item';
        item.innerHTML = `
            <h4>${formation.titre}</h4>
            <p><strong>Date:</strong> ${formatDate(formation.date)} - ${formation.horaire}</p>
            <p><strong>Type:</strong> ${formation.type} | <strong>Format:</strong> ${formation.format}</p>
            <p><strong>Prix:</strong> ${formation.prix}</p>
            <div style="margin-top: 0.5rem;">
                <a href="${formation.lien}" class="btn-card btn-primary" target="_blank" rel="noopener" style="display: inline-block; padding: 0.5rem 1rem;">En savoir plus</a>
            </div>
        `;
        container.appendChild(item);
    });
}

// Get events for a specific date
function getEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return filteredFormations.filter(formation => formation.date && formation.date === dateStr);
}

// Change month
function changeMonth(delta) {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
    renderCalendrierView();
}

// Format date
function formatDate(dateStr) {
    if (!dateStr || dateStr === '') {
        return 'Toujours disponible';
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Show error
function showError(message) {
    const container = document.getElementById('liste-container');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h3>Erreur</h3>
            <p>${message}</p>
        </div>
    `;
}
