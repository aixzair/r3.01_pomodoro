/* Constantes ----------------------------------------------------- */
/* Entrées */
const BOUTON = document.getElementById("bouton");
const INPUT_TEMPS_TRAVAIL = document.getElementById("input_travail");
const INPUT_TEMPS_PAUSE = document.getElementById("input_pause");

/* Affichage */
const STATUS = document.getElementById("status");
const MINUTES = document.getElementById("minutes");
const SECONDES = document.getElementById("secondes");

/* Code */
const NOM_BOUTON_TRAVAIL = "commencer";
const NOM_BOUTON_PAUSE = "réinitialiser";

/* Evenements ------------------------------------------------------------ */
BOUTON.addEventListener("click", pomodoro);
INPUT_TEMPS_TRAVAIL.addEventListener("change", changerDuree);
INPUT_TEMPS_PAUSE.addEventListener("change", changerDuree);


/* Variables globales ----------------------------------------------------- */
let temps_travail = 25; // Temps en minutes
let temps_pause = 5;    // Temps en minutes

let minutes = 0;
let secondes = 0;
let ilTravail = true;
let applicationEnFonctionnement = false;

/* Lancement de l'application ---------------------------------------------- */
INPUT_TEMPS_TRAVAIL.value = temps_travail;
INPUT_TEMPS_PAUSE.value = temps_pause;

/* Fonctions --------------------------------------------------------------- */

/**
 * Récupère et change les durée de travail et de pause
 */
function changerDuree() {
    if (applicationEnFonctionnement) {
        INPUT_TEMPS_TRAVAIL.value = temps_travail;
        INPUT_TEMPS_PAUSE.value = temps_pause;
        return;
    }

    temps_travail = INPUT_TEMPS_TRAVAIL.value;
    temps_pause = INPUT_TEMPS_PAUSE.value;

    MINUTES.textContent = formatNombreText(temps_travail);
    document.getElementById("temps_travail").textContent = formatNombreText(temps_travail);
    document.getElementById("temps_pause").textContent = formatNombreText(temps_pause);
}

/**
 * Renvoies un nombre avec un 0 devant si il n'a qu'un seule chiffre
 * @param {*} nombre 
 * @returns le nombre en format textuel
 */
function formatNombreText(nombre) {
    let string = nombre.toString();
    string = (string.length < 2) ? '0' + string : string;
    return string;
}

/**
 * Affiche le temps
 */
function afficherTemps() {
    MINUTES.textContent = formatNombreText(minutes);
    SECONDES.textContent = formatNombreText(secondes);
}

/**
 * Décrémente la durée
 */
function compteARebour() {
    if (secondes == 0) {
        if (minutes == 0) {
            if (ilTravail) {
                ilTravail = false;
                STATUS.textContent = "Pause";

                minutes = temps_pause;
                secondes = 0;
            } else {
                ilTravail = true;
                STATUS.textContent = "Travail";

                minutes = temps_travail;
                secondes = 0;
            }
            return;
        }
        minutes--;
        secondes = 59;

        return;
    }
    secondes--;
}

/**
 * Lance le pomodoro ou redèmare le pomodoro
 */
function pomodoro() {
    if (BOUTON.textContent === NOM_BOUTON_TRAVAIL) {
        BOUTON.textContent = NOM_BOUTON_PAUSE;
        
        minutes = temps_travail;
        applicationEnFonctionnement = true;

        setInterval(() => {
            compteARebour();
            afficherTemps();
        }, 1000);
    } else if (BOUTON.textContent === NOM_BOUTON_PAUSE) {
        location.reload();  // Redémare l'application
    } else {
        console.log("contenue textuel du bouton invalide (fonction pomodoro)");
    }
}