export const validatorsRules = {
    firstnamePattern: '^[a-zA-Z ,.\'-]{2,}$',
    lastnamePattern: '^[a-zA-Z ,.\'-]{2,}$',
    usernamePattern: '[a-zA-Z0-9.\'-]{2,}$',
    emailPattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$',
    passwordPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_~`:;",/}{>|.<=)(+-]).{8,}$',
};//TODO: Get the patterns from server

export function matchPattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}

export const validatorMessages = {
    firstName: {
        required: 'Le prénom est requis.',
        minlength: 'Le prénom doit avoir au moins 2 caractères.'
    },
    lastName: {
        required: 'Le nom est requis.' ,
        minlength: 'Le nom doit avoir au moins 2 caractères.'
    },
    email: {
        required: 'L\'email est requis.',
        pattern: 'Adresse email invalide.'
    },
    password: {
        required: 'Le mot de passe est requis.',
        minlength: 'Le mot de passe doit avoir au moins 8 caractères',
        pattern: '8 charactères mini, 1 maj, 1 min, 1 chiffre, 1 spécial.'
    },
    confirm_password: {
        required: 'Veuillez confirmer le mot de passe.'
    },
    matching_passwords: {
        areEqual: 'Les mots de passe ne correspondent pas.'
    },
    job: {
        required: 'Veuillez selectionner votre poste.'
    }
};
