export const Player = "Player"

const displayGameOver = document.getElementById('game-over');
const barreEnergie = document.getElementById('barre-verte');
const energie = document.getElementById('energie-actuel');
const score = document.getElementById('score');
const scoreFinal = document.getElementById('scoreFinal');
let barreEnergieActuel = 100;
let scoreActuel = 0;
let energieActuel = 40;

/**
 * Place l'avatar du joueur dans la grille du jeu
 * @param {string[]} grille la grille dans laquelle sera placer le joueur 
 */
export function PlacerAvatarUser(grille) {
    grille[(Math.ceil(grille.length / 2) - 1)][(Math.ceil(grille[0].length / 2) - 1)] = Player;
    barreEnergieActuel = 100;
    scoreActuel = 0;
    energieActuel = 40;
    affichageScoreEnergie()
}

/**
 * trouve la hauteur du joueur dans la grille
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @returns la hauteur du joueur dans la grille
 */
export function indexHauteurUser(grille) {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[0].length; j++) {
            if (Player === grille[i][j]) {
                return i;
            }
        }
    }
}

/**
 * trouve la largeur du joueur dans la grille
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @returns la largeur du joueur dans la grille
 */
export function indexLargeurUser(grille) {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[0].length; j++) {
            if (Player === grille[i][j]) {
                return j;
            }

        }
    }
}

//Mets à jour le score et l'energie
function miseAJourEnergie(tuilleAtteinte) {
    if (tuilleAtteinte === "P") {
        barreEnergieActuel -= (100 / 40);
        energieActuel -= 1;
    }

    affichageScoreEnergie();
}

//Affiche le score et l'energie
function affichageScoreEnergie() {
    barreEnergie.style.width = barreEnergieActuel + '%';
    energie.innerText = energieActuel + "/40";
    score.innerText = scoreActuel;
}
/**
 * Deplace le joueur d'une case vers le haut en modifiant sont score et son energie puis execute checkGameOver
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @param {boolean} etatJeu verifie si le jeu est en cours
 */
export function deplacementHaut(grille, etatJeu) {
    if (indexHauteurUser(grille) > 0 && energieActuel > 0 && etatJeu) {
        TraitementDePoint(grille, indexHauteurUser(grille) - 1, (indexLargeurUser(grille)));
        miseAJourEnergie(grille[indexHauteurUser(grille) - 1][ indexLargeurUser(grille)]);
        let nouvelleHauteur = indexHauteurUser(grille) - 1;
        let nouvelleLargeur = indexLargeurUser(grille);
        grille[indexHauteurUser(grille)][indexLargeurUser(grille)] = '';
        grille[nouvelleHauteur][nouvelleLargeur] = Player;
    }

    checkGameOver(energieActuel);
}

/**
 * Deplace le joueur d'une case vers le bas en modifiant sont score et son energie puis execute checkGameOver
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @param {boolean} etatJeu verifie si le jeu est en cours
*/
export function deplacementBas(grille, etatJeu) {
    if (indexHauteurUser(grille) < grille.length - 1 && energieActuel > 0 && etatJeu) {
        TraitementDePoint(grille, indexHauteurUser(grille) + 1, (indexLargeurUser(grille)));
        miseAJourEnergie(grille[indexHauteurUser(grille) + 1][ indexLargeurUser(grille)]);
        let nouvelleHauteur = indexHauteurUser(grille) + 1;
        let nouvelleLargeur = indexLargeurUser(grille);
        grille[indexHauteurUser(grille)][indexLargeurUser(grille)] = '';
        grille[nouvelleHauteur][nouvelleLargeur] = Player;
    }

    checkGameOver(energieActuel);
}

/**
 * Deplace le joueur d'une case vers la gauche en modifiant sont score et son energie puis execute checkGameOver
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @param {boolean} etatJeu verifie si le jeu est en cours
*/
export function deplacementGauche(grille, etatJeu) {
    if (indexLargeurUser(grille) > 0 && energieActuel > 0 && etatJeu) {
        TraitementDePoint(grille, indexHauteurUser(grille), (indexLargeurUser(grille) - 1));
        miseAJourEnergie(grille[indexHauteurUser(grille)][ indexLargeurUser(grille) - 1]);
        let nouvelleHauteur = indexHauteurUser(grille);
        let nouvelleLargeur = indexLargeurUser(grille) - 1;
        grille[indexHauteurUser(grille)][indexLargeurUser(grille)] = '';
        grille[nouvelleHauteur][nouvelleLargeur] = Player;
    }

    checkGameOver(energieActuel);
}

/**
 * Deplace le joueur d'une case vers la droite en modifiant sont score et son energie puis execute checkGameOver
 * @param {string[]} grille la grille dans laquelle se trouve le joueur
 * @param {boolean} etatJeu verifie si le jeu est en cours
*/
export function deplacementDroite(grille, etatJeu) {

    if (indexLargeurUser(grille) < grille[0].length - 1 && energieActuel > 0 && etatJeu) {
        TraitementDePoint(grille, indexHauteurUser(grille), (indexLargeurUser(grille) + 1));
        miseAJourEnergie(grille[indexHauteurUser(grille)][indexLargeurUser(grille) + 1]);
        let nouvelleHauteur = indexHauteurUser(grille);
        let nouvelleLargeur = indexLargeurUser(grille) + 1;
        grille[indexHauteurUser(grille)][indexLargeurUser(grille)] = '';
        grille[nouvelleHauteur][nouvelleLargeur] = Player;
    }

    checkGameOver(energieActuel);
}

/**
 * Verifie le contenue de la prochaine case du joueur, et change le score ou l'energie
 * @param {string[]} grille tableaux qui represente le dungeon
 * @param {number} hauteur prochaine hauteur
 * @param {number} largeur prochaine largeur
 */
function TraitementDePoint(grille, hauteur, largeur) {
    //eleve 50 point pour un piege
    if (grille[hauteur][largeur] === "P") {
        scoreActuel -= 50;
    }

    //ajoute 1000 point pour un trésor
    else if (grille[hauteur][largeur] === "T") {
        scoreActuel += 1000;
    }

    //Ajoute 1 energie au joueur
    else if (grille[hauteur][largeur] === "B" && energieActuel < 40) {
        energieActuel += 1;
        barreEnergieActuel += (100 / 40);
    }

    //eleve 10 point pour un piege
    else if (grille[hauteur][largeur] === "") {
        scoreActuel -= 10;
    }
}

/**
 * Verifie l'energie pour mettre fin au jeu
 * @param {number} energie energie verifier
 */
export function checkGameOver(energie) {
    if (energie <= 0) {
        scoreFinal.innerText = scoreActuel
        displayGameOver.style.display = "flex";
    }
}