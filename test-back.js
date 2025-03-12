console.log("🚀 Début des tests PocketBase...\n");

import {
    allFilms, allActivites, allInvites,
    getFilm, getActivite, getInvite,
    getActivitesByInviteId, getActivitesByInviteNom,
    updateItem, pb 
} from './backend.mjs';

const testAllFunctions = async () => {
    try {
        console.log("\n🟢 Test: Récupération de tous les films...");
        const films = await allFilms();
        console.log("🎬 Films trouvés:", films.length > 0 ? films : "Aucun film trouvé");

        console.log("\n🟢 Test: Récupération de toutes les activités...");
        const activites = await allActivites();
        console.log("🎭 Activités trouvées:", activites.length > 0 ? activites : "Aucune activité trouvée");

        console.log("\n🟢 Test: Récupération de tous les invités...");
        const invites = await allInvites();
        console.log("🎭 Invités trouvés:", invites.length > 0 ? invites : "Aucun invité trouvé");

        if (films.length > 0) {
            console.log("\n🟢 Test: Récupération d’un film par ID...");
            const film = await getFilm(films[0].id);
            console.log("🎬 Film récupéré:", film);
        }

        if (activites.length > 0) {
            console.log("\n🟢 Test: Récupération d’une activité par ID...");
            const activite = await getActivite(activites[0].id);
            console.log("🎭 Activité récupérée:", activite);
        }

        if (invites.length > 0) {
            console.log("\n🟢 Test: Récupération d’un invité par ID...");
            const invite = await getInvite(invites[0].id);
            console.log("🎭 Invité récupéré:", invite);
        }

        if (invites.length > 0) {
            console.log("\n🟢 Test: Récupération des activités d'un invité par ID...");
            const activitesInvite = await getActivitesByInviteId(invites[0].id);
            console.log("🎭 Activités de l'invité:", activitesInvite.length > 0 ? activitesInvite : "Aucune activité trouvée");
        }

        if (invites.length > 0) {
            console.log("\n🟢 Test: Récupération des activités d'un invité par Nom...");
            const activitesInviteNom = await getActivitesByInviteNom(invites[0].nom);
            console.log("🎭 Activités de l'invité par nom:", activitesInviteNom.length > 0 ? activitesInviteNom : "Aucune activité trouvée");
        }

        console.log("\n🟢 Test: Ajout d’un nouveau film...");
        const newFilm = await updateItem("film", null, { titre_film: "Film Test", sortie: "2025-06-15", genre: ["Animation"] });
        console.log("✅ Nouveau film ajouté:", newFilm);

        console.log("\n🟢 Test: Mise à jour du film...");
        const updatedFilm = await updateItem("film", newFilm.id, { titre_film: "Film Modifié" });
        console.log("✅ Film mis à jour:", updatedFilm);

        console.log("\n🟢 Test: Suppression du film...");
        await pb.collection("film").delete(newFilm.id); 
        console.log("✅ Film supprimé.");

        console.log("\n✅✅✅ Tous les tests ont réussi !");
    } catch (error) {
        console.error("❌ Erreur pendant les tests:", error);
    }
};

testAllFunctions().then(() => console.log("\n✅ Fin des tests ! 🚀"));
