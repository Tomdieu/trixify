export interface SocialLinkType {
    id: number;
    label: string;
    url: string;
}

export interface ProfileType {
    id: number,
    user: number,
    bio?: string,
    birth_date?: string,
    social_links: SocialLinkType[]
}

export interface UserType {
    id: number,
    username: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
    email: string,
    phone_number: string,
    is_online: boolean,
    profile: ProfileType,
    date_joined: string,
}