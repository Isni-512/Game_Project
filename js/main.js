import { creationGrille } from './fonctionDungeon.js';
import { Player, PlacerAvatarUser, deplacementHaut, deplacementBas, deplacementGauche, deplacementDroite, checkGameOver } from './fonctionJoueur.js'

//Déclaration des variables

let grille = creationGrille(15, 25);
let etatJeu = true
const dungeonId = document.getElementById('Dungeon')
const displayGameOver = document.getElementById('game-over');
const boutonGauche = document.getElementById('fleche-gauche')
const boutonDroit = document.getElementById('fleche-droit')
const boutonHaut = document.getElementById('fleche-haut')
const boutonBas = document.getElementById('fleche-bas')
const boutonRetry = document.getElementById('retry')
const boutonExit = document.getElementById('exit')

//les fonctions

/**
 * Cette fonction genere le dungeon on y ajoutant les case du tableau et les image
 */
function creationDungeon() {

    // Effacer les elements du tableau
    dungeonId.innerHTML = '';

    //Verifie les élement du tableaux et place les images dans le dungeon
    for (let i = 0; i < grille.length; i++) {

        //crée une ligne pour dungeon
        const tr = document.createElement('tr');
        for (let j = 0; j < grille[0].length; j++) {

            //crée  une colonne à la ligne actule pour le donjon
            const td = document.createElement('td');

            //ajoute une image de piege au dungeon
            if (grille[i][j] === "P") {
                const imgPiege = document.createElement('img');
                imgPiege.src = '/assets/Spike_trap.png';
                td.append(imgPiege);
            }

            //ajoute une image de trésor au dungeon
            else if (grille[i][j] === "T") {

                const imgTresor = document.createElement('img');
                imgTresor.src = '/assets/gold_s_chest.png';
                td.append(imgTresor);
            }

            else if (grille[i][j] === "B") {

                const imgBonus = document.createElement('img');
                imgBonus.src = '/assets/viande.png';
                td.append(imgBonus);
            }

            //ajoute une image pour le joueur au dungeon
            else if (grille[i][j] === Player) {
                const imgPlayer = document.createElement('img');
                imgPlayer.src = '/assets/Player.png';
                td.append(imgPlayer);
            }

            //ajoute une image de sol au dungeon
            else {
                const imgSol = document.createElement('img');
                imgSol.src = '/assets/soltd.png';
                td.append(imgSol);
            }

            tr.append(td);
        }

        dungeonId.append(tr);
    }
}

/**
 * Deplace le joueur en fonction du bouton appuyer
 */
function DeplacementPlayer(event) {

    // deplace le personnage vers le haut
    if (event.currentTarget === boutonHaut || event.key === "ArrowUp") {
        deplacementHaut(grille, etatJeu);
        creationDungeon();
    }

    //deplace le personnage vers la gauche
    else if (event.currentTarget === boutonGauche || event.key === "ArrowLeft") {
        deplacementGauche(grille, etatJeu);
        creationDungeon();
    }

    //deplace le personnage vers le bas
    else if (event.currentTarget === boutonBas || event.key === "ArrowDown") {
        deplacementBas(grille, etatJeu)
        creationDungeon();
    }

    //deplace le personnage vers la droite
    else if (event.currentTarget === boutonDroit || event.key === "ArrowRight") {
        deplacementDroite(grille, etatJeu);
        creationDungeon();
    }
}

/**
 * crée une nouvelle grille
 */
function retry() {
    grille = creationGrille(15, 25);
    PlacerAvatarUser(grille);
    creationDungeon();
    displayGameOver.style.display = 'none';
    etatJeu = true;
}

/**
 * execute le checkGameOver pour mettre fin au jeu
 */
function exitDungeon() {
    checkGameOver(0);
    etatJeu = false;
}

//Execution au démarage
PlacerAvatarUser(grille);
creationDungeon();
document.addEventListener('keydown', DeplacementPlayer);
boutonHaut.addEventListener('click', DeplacementPlayer);
boutonGauche.addEventListener('click', DeplacementPlayer);
boutonBas.addEventListener('click', DeplacementPlayer);
boutonDroit.addEventListener('click', DeplacementPlayer);
boutonRetry.addEventListener('click', retry);
boutonExit.addEventListener('click', exitDungeon);