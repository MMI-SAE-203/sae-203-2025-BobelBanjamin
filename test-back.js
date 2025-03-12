console.log("🚀 Début des tests PocketBase...\n");

import {
    allFilms, allActivites, allInvites,
    getFilm, getActivite, getParticipant,
    getActivitesByAnimateurId, getActivitesByAnimateurNom,
    updateItem,
    allInvites
} from './backend.mjs';

const testAllFunctions = async () => {
    try {
        console.log("\n🟢 Test: Récupération de tous les films...");
        const films = await allFilms();
        console.log("🎬 Films trouvés:", films.length > 0 ? films : "Aucun film trouvé");

        console.log("\n🟢 Test: Récupération de toutes les activités...");
        const activites = await allActivites();
        console.log("🎭 Activités trouvées:", activites.length > 0 ? activites : "Aucune activité trouvée");

        console.log("\n🟢 Test: Récupération de tous les participants...");
        const participants = await allInvites();
        console.log("🎭 Participants trouvés:", participants.length > 0 ? participants : "Aucun participant trouvé");

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

        if (participants.length > 0) {
            console.log("\n🟢 Test: Récupération d’un participant par ID...");
            const participant = await getParticipant(participants[0].id);
            console.log("🎭 Participant récupéré:", participant);
        }

        if (participants.length > 0) {
            console.log("\n🟢 Test: Récupération des activités d'un animateur par ID...");
            const activitesAnimateur = await getActivitesByAnimateurId(participants[0].id);
            console.log("🎭 Activités de l'animateur:", activitesAnimateur.length > 0 ? activitesAnimateur : "Aucune activité trouvée");
        }

        if (participants.length > 0) {
            console.log("\n🟢 Test: Récupération des activités d'un animateur par Nom...");
            const activitesAnimateurNom = await getActivitesByAnimateurNom(participants[0].nom);
            console.log("🎭 Activités de l'animateur par nom:", activitesAnimateurNom.length > 0 ? activitesAnimateurNom : "Aucune activité trouvée");
        }

        console.log("\n🟢 Test: Ajout d’un nouveau film...");
        const newFilm = await updateItem("film", null, { titre_film: "Film Test", sortie: "2025-06-15" });
        console.log("✅ Nouveau film ajouté:", newFilm);

        console.log("\n🟢 Test: Mise à jour du film...");
        const updatedFilm = await updateItem("film", newFilm.id, { titre_film: "Film Modifié" });
        console.log("✅ Film mis à jour:", updatedFilm);

        console.log("\n🟢 Test: Suppression du film...");
        await updateItem("film", newFilm.id, null);
        console.log("✅ Film supprimé.");

        console.log("\n✅✅✅ Tous les tests ont réussi !");
    } catch (error) {
        console.error("❌ Erreur pendant les tests:", error);
    }
};

testAllFunctions().then(() => console.log("\n✅ Fin des tests ! 🚀"));
