import PocketBase from 'pocketbase';

const pb = new PocketBase('https://sae203.banjamin-bobel.com/_/');

/**
 * 📌 Retourne la liste de tous les films triés par date de projection
 */
export async function allFilms() {
    let films = await pb.collection('film').getFullList({ sort: '-sortie' });

    films = films.map((film) => {
        if (film.affiche) {
            film.imgUrl = pb.files.getURL(film, film.affiche); 
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

    activites = activites.map((activite) => {
        if (activite.photo) {
            activite.imgUrl = pb.files.getURL(activite, activite.photo); 
        } else {
            activite.imgUrl = "/default-activity.png"; 
        }
        return activite;
    });

    return activites;
}

/**
 * 📌 Retourne la liste de tous les invités triés par ordre alphabétique
 */
export async function allInvites() {
    let invites = await pb.collection('invite').getFullList({ sort: 'nom' });

    invites = invites.map((invite) => {
        if (invite.photo) {
            invite.imgUrl = pb.files.getURL(invite, invite.photo); 
        } else {
            invite.imgUrl = "/default-avatar.png"; 
        }
        return invite;
    });

    return invites;
}

/**
 * 📌 Retourne les infos d'un film en donnant son ID
 */
export async function getFilm(id) {
    let film = await pb.collection('film').getOne(id);
    if (film.affiche) {
        film.imgUrl = pb.files.getURL(film, film.affiche); 
    }
    return film;
}

/**
 * 📌 Retourne les infos d'une activité en donnant son ID
 */
export async function getActivite(id) {
    let activite = await pb.collection('activites').getOne(id);
    if (activite.photo) {
        activite.imgUrl = pb.files.getURL(activite, activite.photo);  // ✅ Vérifie cette ligne !
    } else {
        activite.imgUrl = "/default-activity.png";  // ✅ Image par défaut si besoin
    }
    return activite;
}
export async function getInvite(id) {
    let invite = await pb.collection('invite').getOne(id, { expand: "activites,films" });

    console.log("🔍 Invite récupéré depuis PocketBase:", invite);

    // ✅ Vérifie si les activités sont bien récupérées
    invite.activites = invite.expand?.activites || [];
    console.log("📌 Activités trouvées :", invite.activites);

    // ✅ Vérifie si les films sont bien récupérés
    invite.films = invite.expand?.films || [];
    console.log("🎬 Films trouvés :", invite.films);

    // Génération de l'URL de l'image
    invite.imgUrl = invite.photo 
        ? pb.files.getURL(invite, invite.photo) 
        : "/default-avatar.png";

    return invite;
}




/**
 * 📌 Retourne toutes les activités d’un invité donné par son ID
 */
export async function getActivitesByInviteId(id) {
    let activites = await pb.collection('activites').getFullList({
        filter: `invites.id="${id}"`
    });

    return activites;
}

/**
 * 📌 Retourne toutes les activités d’un invité donné par son nom
 */
export async function getActivitesByInviteNom(nom) {
    let invites = await pb.collection('invite').getFullList({
        filter: `nom="${nom}"`
    });

    if (invites.length === 0) {
        throw new Error('Aucun invité trouvé');
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

export { pb };

export async function addFilm(data) {
    try {
        const result = await pb.collection("film").create(data);
        console.log("✅ Film ajouté :", result);
        return result;
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout du film :", error);
        throw error;
    }
}
