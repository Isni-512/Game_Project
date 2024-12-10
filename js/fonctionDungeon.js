
/**
 *  * remplie le tableau placer en paramètre en un tableau deux dimension 
 * à partir des variables placer en parametre
 * @param {number} hauteur la hauteur de la grille.
 * @param {number} largeur la largeur de la grille.
 * retourne le tableau qui represente les grilles du donjon.
 */

export function creationGrille(hauteur, largeur) {
    let tuile;
    let grille= [];
    for (let i = 0; i < hauteur; i++) {
        grille.push([]);
        for (let j = 0; j < largeur; j++) {

            let nombre = Math.round(Math.random() * 101);

            //ajoute P au tableau pour represneter un piege
            if (nombre < 90) {
                tuile = "P";
            }

            //ajoute B au tableau pour represneter un bonus
            else if (90<nombre && nombre< 95 ){
                tuile = "B";
            }

            //ajoute t au tableau pour represneter un Trésor
            else {
                tuile = "T";
            }

            grille[i].push(tuile);
        }
    }

    return grille;
}