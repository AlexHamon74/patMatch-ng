export interface loginCheck {
    username: string;
    password: string;
}

export interface Token {
    token: string;
}

export interface RegisterInterface {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
}