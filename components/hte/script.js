//========================================
// 1. Inicialización de Variables Globales
//========================================

const audioPlayer = new Audio();
const songsList = document.querySelector('#songs-list'); 

// Referencia al botón que está sonando (que tiene la clase 'active-play')
let activePlaybackButton = null; 

// Nuevas variables para los elementos de progreso de la canción activa
let currentProgressBar = null;
let currentTimeDisplay = null;
let durationTimeDisplay = null;

// Variables para los elementos del modal
const modalOverlay = document.querySelector('#modal-overlay');
const closeButton = document.querySelector('#modal-close-btn');
const modalText = document.querySelector('#modal-text');

//===============================================
// 2. Función Auxiliar: Formato de Tiempo (MM:SS)
//===============================================

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    // Añade un cero inicial si los segundos son menores a 10
    const paddedSec = sec < 10 ? '0' + sec : sec; 
    return `${min}:${paddedSec}`;
}

//=================================================================
// 3. Función Principal: Manejo del Click y Estado de Reproducción 
//=================================================================

function togglePlayback(event) {
    const clickedButton = event.target.closest('.playback-control');
    if (!clickedButton) return; 

    const trackItem = clickedButton.closest('li'); 
    
    // **ACTUALIZA LAS REFERENCIAS DE PROGRESO DE LA CANCIÓN SELECCIONADA**
    if (trackItem) {
        currentProgressBar = trackItem.querySelector('.progress-bar');
        currentTimeDisplay = trackItem.querySelector('.current-time');
        durationTimeDisplay = trackItem.querySelector('.duration-time');
    }

    const newSrc = clickedButton.getAttribute('data-src');

    // 1. LÓGICA DE PAUSA GLOBAL (Canción diferente)
    // Si hay un botón activo y NO es el que se acaba de cliquear, lo pausamos.
    if (activePlaybackButton && activePlaybackButton !== clickedButton) {
        audioPlayer.pause();
        activePlaybackButton.classList.remove('active-play');
        // Continuamos para cargar la nueva canción
    }

    // 2. LÓGICA DE PAUSE (Misma Canción, está sonando)
    // Si se hace clic en el botón actualmente activo y la canción está sonando -> Pausar.
    if (activePlaybackButton === clickedButton && !audioPlayer.paused) {
        audioPlayer.pause();
        clickedButton.classList.remove('active-play');
        // Mantenemos activePlaybackButton != null para indicar que está "en pausa aquí".
        return; 
    }

    // 3. LÓGICA DE REANUDAR o INICIAR NUEVA CANCIÓN
    
    // Si el botón que se clica NO es el mismo que estaba activo (o no hay activo),
    // o si el SRC en el reproductor está vacío, es una nueva canción y DEBE cargarse.
    
    // **NOTA:** Usamos la comparación del botón (activePlaybackButton !== clickedButton) 
    // como el indicador más confiable de que debemos cambiar de fuente y recargar.
    
    const isNewSong = activePlaybackButton !== clickedButton || !audioPlayer.src;
    
    if (isNewSong) {
        audioPlayer.src = newSrc;
        audioPlayer.load(); // Esto recarga la canción y la pone al inicio (tiempo 0).
    }

    // Establecer el tiempo de inicio desde el input range.
    // Esto se hace SIEMPRE, ya sea para reanudar o para iniciar.
    if (currentProgressBar) {
        audioPlayer.currentTime = currentProgressBar.value;
    }

    // Si activePlaybackButton === clickedButton, significa que estamos reanudando la canción 
    // que fue pausada, por lo que NO se llama a load().

    // Reproducir la canción (reanuda si estaba pausada, empieza si es nueva/recargada)
    audioPlayer.play().catch(e => {
        console.error("Error al iniciar reproducción (posiblemente bloqueado por el navegador):", e);
    });
    
    // Actualizar la interfaz y la referencia
    clickedButton.classList.add('active-play');
    activePlaybackButton = clickedButton; // Restablece la referencia para el caso de reanudar
}

//=====================================
// 4. Listeners de Eventos (Audio y UI)
//=====================================

// Listener en el contenedor principal (Delegación de Eventos)
if (songsList) {
    songsList.addEventListener('click', (event) => {
        togglePlayback(event) 
        const clickedButton = event.target.closest('.meaning-button');
        if (clickedButton) {
            toggleMeaning({ target: clickedButton }); // Llamamos con el botón clicado
        }
    });
    
    // Listener para la funcionalidad de 'seeking' (arrastrar la barra)
    songsList.addEventListener('input', (event) => {
        // Comprobar si el evento viene de una barra de progreso
        if (event.target.classList.contains('progress-bar')) {
            const progressBar = event.target;
            const newTime = progressBar.value;
            
            // 1. Actualizar el tiempo visualmente (pre-búsqueda): 
            // Buscamos el elemento .current-time dentro del contenedor (li) de la barra.
            const trackItem = progressBar.closest('li');
            const display = trackItem ? trackItem.querySelector('.current-time') : null;
            
            if (display) {
                display.textContent = formatTime(newTime);
            }

            // 2. Aplicar el tiempo SÓLO si la canción ya está activa/sonando
            // Si activePlaybackButton existe y el audio no está pausado, aplicamos el cambio inmediato.
            if (activePlaybackButton && !audioPlayer.paused) {
                audioPlayer.currentTime = newTime;
            }
        }
    });
}

// Listener para el cierre del modal
closeButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});


//===========================================
// 5. Función de Carga de Duración al inicio
//===========================================

function loadTrackDurations() {
    const trackItems = songsList.querySelectorAll('li');

    trackItems.forEach(trackItem => {
        const audioControl = trackItem.querySelector('.playback-control');
        if (!audioControl) return; 
        
        const audioSrc = audioControl.getAttribute('data-src');
        const durationDisplay = trackItem.querySelector('.duration-time');
        
        if (!audioSrc || !durationDisplay) return;

        const tempAudio = new Audio();
        tempAudio.src = audioSrc;
        tempAudio.load();

        tempAudio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(tempAudio.duration);
        });
    });
}

//===========================================
// 6. Llamada a la Función de Inicialización
//===========================================
document.addEventListener('DOMContentLoaded', loadTrackDurations);

// --- LISTENERS DEL OBJETO AUDIO ---

// Listener para mostrar la duración total de la canción
audioPlayer.addEventListener('loadedmetadata', () => {
    if (durationTimeDisplay && currentProgressBar) {
        durationTimeDisplay.textContent = formatTime(audioPlayer.duration);
        currentProgressBar.max = audioPlayer.duration;
        currentProgressBar.value = 0;
        currentTimeDisplay.textContent = formatTime(0);
    }
});

// Listener para actualizar el tiempo actual y la barra de progreso
audioPlayer.addEventListener('timeupdate', () => {
    if (currentProgressBar && currentTimeDisplay) {
        currentProgressBar.value = audioPlayer.currentTime;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
});

// Listener para cuando una canción termina
audioPlayer.addEventListener('ended', () => {
    if (activePlaybackButton) {
        activePlaybackButton.classList.remove('active-play');
        activePlaybackButton = null;
        
        if (currentProgressBar) {
            currentProgressBar.value = 0;
            currentTimeDisplay.textContent = formatTime(0);
        }
    }
});

//=====================
// 7. Lógica del Modal 
//=====================

// 1. La lógica de apertura es mucho más simple
function toggleMeaning(event) {
    const clickedButton = event.target.closest('.meaning-button');
    if (!clickedButton) return; 

    // Obtener el contenido del botón clicado
    const text = clickedButton.getAttribute('data-meaning');

    // 💥 Inyectar el contenido dinámicamente
    modalText.textContent = text;

    // Abrir el overlay principal
    modalOverlay.classList.remove('hidden');
}

// 2. La función de cerrar (closeModal) se mantiene igual:
function closeModal() {
    modalOverlay.classList.add('hidden');
}

// 3. Asignar listeners
closeButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
