import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 * 📌 Retourne la liste de tous les films triés par date de projection
 */
export async function allFilms() {
    let films = await pb.collection('film').getFullList({ sort: '-sortie' });

    films = films.map((film) => {
        if (film.affiche) {
            film.imgUrl = pb.files.getUrl(film, film.affiche);
        }
        return film;
    });

    return films;
}

/**
 * 📌 Retourne la liste de toutes les activités triées par date
 */
export async function allActivites() {
    let activites = await pb.collection('activites').getFullList({ sort: '-date_act' });

    return activites;
}

/**
 * 📌 Retourne la liste de tous les acteurs / réalisateurs triés par ordre alphabétique
 */
export async function allParticipants() {
    let participants = await pb.collection('invite').getFullList({ sort: 'nom' });

    return participants;
}

/**
 * 📌 Retourne les infos d'un film en donnant son ID
 */
export async function getFilm(id) {
    let film = await pb.collection('film').getOne(id);
    if (film.affiche) {
        film.imgUrl = pb.files.getUrl(film, film.affiche);
    }
    return film;
}

/**
 * 📌 Retourne les infos d'une activité en donnant son ID
 */
export async function getActivite(id) {
    let activite = await pb.collection('activites').getOne(id);
    return activite;
}

/**
 * 📌 Retourne les infos d'un acteur / réalisateur en donnant son ID
 */
export async function getParticipant(id) {
    let participant = await pb.collection('invite').getOne(id);
    return participant;
}

/**
 * 📌 Retourne toutes les activités d’un animateur donné par son ID
 */
export async function getActivitesByAnimateurId(id) {
    let activites = await pb.collection('activites').getFullList({
        filter: `invites.id="${id}"`
    });

    return activites;
}

/**
 * 📌 Retourne toutes les activités d’un animateur donné par son nom
 */
export async function getActivitesByAnimateurNom(nom) {
    let invites = await pb.collection('invite').getFullList({
        filter: `nom="${nom}"`
    });

    if (invites.length === 0) {
        throw new Error('Aucun animateur trouvé');
    }

    let activites = await pb.collection('activites').getFullList({
        filter: `invites.id="${invites[0].id}"`
    });

    return activites;
}

/**
 * 📌 Ajoute ou met à jour un film, une activité ou un invité
 */
export async function updateItem(collection, id, data) {
    if (!['film', 'activites', 'invite'].includes(collection)) {
        throw new Error('Collection non valide');
    }

    let result;
    if (id) {
        result = await pb.collection(collection).update(id, data);
    } else {
        result = await pb.collection(collection).create(data);
    }

    return result;
}


