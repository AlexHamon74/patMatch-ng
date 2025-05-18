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