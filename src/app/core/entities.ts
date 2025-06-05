// Interface pour le login et register
// -----------------------------------
export interface loginCheck {
    username: string;
    password: string;
}

export interface RegisterInterface {
    email: string;
    password: string;
    roles: string[];
}

// Interface pour le tokens JWT
// ----------------------------
export interface Token {
    token: string;
}

export interface TokenPayload {
    id: number;
    roles: string[];
}


// Interface pour les clients
// --------------------------
export interface ClientInterface {
    '@id': string;
    id: number;
    email: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    numeroDeTelephone: string;
    adresse: string;
    photoProfil: string;
    typeLogement: string;
    espaceExterieur: string;
    typeEnvironnement: string;
    autresAnimaux: boolean;
    animauxDescription: string;
    presenceEnfant: boolean;
    enfantsDescription: string;
    animauxPreferes: string;
    raceSouhaitee: string;
    ageSouhaite: string;
    sexeSouhaite: string;
    niveauExperience: string;
    misAJourLe: string;
    swipes: string[];
}

// Interface pour les éleveurs
// ---------------------------
export interface BreederApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: BreederInterface[];
}

export interface BreederInterface {
    '@id': string;
    id: number;
    email: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    numeroTelephone: string;
    adresse: string;
    photoProfil: string;
    nomElevageAssociation: string;
    numeroEnregistrement: string;
    presentation: string;
    certificat: string;
    adresseElevage: string;
    anneeCreation: string;
    especeProposee: string;
    horaireOuverture: string;
    conditionAdoption: string;
    suiviPostAdoption: boolean;
    suiviPostAdoptionDescription: string;
    misAJourLe: string;
}

// Interface pour les animaux
// --------------------------
export interface AnimalData {
    nom: string;
    dateDeNaissance: string;
    sexe: string;
    numeroIdentification: number;
    poids: number;
    taille: number;
    statutVaccination: string;
    statutSterilisation: string;
    infosSante: string;
    typeAlimentation: string;
    typeAlimentationDetails?: string;
    niveauEnergie: string;
    sociabilite: string;
    education: string;
    typeLogement: string;
    familleIdeale: string;
    besoinsExercice: string;
    histoire: string;
    infosSupplementaires?: string;
    prix: number;
    animalImage: string;
}
export interface AnimalCreateInterface extends AnimalData {
    id: string;
    eleveur: string;
    race: string;
}

export interface AnimalApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: AnimalInterface[];
}

export interface AnimalInterface extends AnimalData {
    '@id': string;
    id: string;
    race: RaceInterface;
    eleveur: BreederInterface;
}

// Interface pour les espèces et les races
// ---------------------------------------
export interface EspeceApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: EspeceInterface[];
}

export interface EspeceInterface {
    id: number;
    nom: string;
    races: RaceInterface[];
}

export interface RaceInterface {
    '@id': string;
    id: number;
    nom: string;
}

// Interface pour les swipes
// -------------------------
export interface SwipeCreateInterface {
    animal: string;
    client: string | number;
    type: 'like' | 'dislike';
}

export interface SwipeInterface {
    id: string;
    animal: {
        id:string;
        nom: string;
        animalImage: string;
    }
}

// Interface pour les adoptions
// ----------------------------
export interface AdoptionCreateInterface {
    animal: string;
    client: string | number;
    dateDemande: string;
    status: string;
}

export interface AdoptionInterface {
    id: number;
    dateDemande: string;
    status: string;
    animal : {
        id: string;
        nom: string;
        animalImage: string;
        eleveur: {
            id: number;
            nomElevageAssociation: string;
        }
    };
}

export interface UserAdoptionInterface {
    adoptions: AdoptionInterface[];
}

export interface AdoptionListBreederInterface {
    id: number;
    dateDemande: string;
    status: string;
    animal: {
        id:string;
        nom: string;
        animalImage: string;
    }
    client: {
        id:string;
        email: string;
        nom: string;
        prenom: string;
        photoProfil: string;
    }
}

// Interface pour la liste des animaux côté éleveur
// ------------------------------------------------
export interface BreederAnimalInterface {
    id: number;
    nom: string;
    animalImage: string;
    sexe: string;
    dateDeNaissance: string;
    race: {
        nom: string;
    }
    swipes: {
        type: string;
    }[];
}

export interface BreederAnimalListInterface {
    animals: BreederAnimalInterface[];
}