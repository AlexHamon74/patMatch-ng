export interface HydraResponse<T> {
    'member': T[];
}

export interface loginCheck {
    username: string;
    password: string;
}

export interface Token {
    token: string;
}

export interface TokenPayload {
    id: number;
    roles: string[];
}

export interface RegisterInterface {
    email: string;
    password: string;
    roles: string[];
}

export interface ClientInterface {
    '@id': string;
    id: number;
    email: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    numeroTelephone: string;
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
}

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
}

export interface AnimalCreateInterface {
    eleveur: string;
    // Etape 1 :
    nom: string;
    dateDeNaissance: string;
    sexe: string;
    numeroIdentification: number;
    race: string;
    poids: number;
    taille: number;

    // Etape 2 :
    statutVaccination: string;
    statutSterilisation: string;
    infoSante: string;
    typeAlimentation: string;
    typeAlimentationDetails?: string;

    // Etape 3 :
    niveauEnergie: string;
    sociabilite: string;
    education: string;

    // Etape 4 :
    typeLogement: string;
    familleIdeale: string;
    besoinsExercice: string;

    // Etape 5 :
    histoire?: string;
    infosSupplementaires?: string;
    prix: number;

    // Etape 6 :
    // photos: string[];
}

export interface AnimalApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: AnimalInterface[];
}

export interface AnimalInterface {
    '@id': string;
    id: string;
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
    // photos: string[];
    race: RaceInterface;
    eleveur: {
        adresseElevage: string;
    }
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

export interface SwipeCreateInterface {
    animal: string;
    client: string | number;
    type: 'like' | 'dislike';
}