export type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    agreeToTerms: boolean;
};

export type SignInFormData = {
    email: string;
    password: string;
};


export type MNKGroups = { 

    createdAt : string ; 
    id : string ; 
    name : string ; 
    users : string[]

}