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

export interface MininalUserType {
    id: number,
    username: string,
    phone_number: string,
    is_online: boolean,
    avatar?: string,
}

export interface NextAuthUserType{
    user:UserType;
    token:string;
}


export interface GroupMemberType {
    user:MininalUserType;
    is_active:boolean;
    is_admin:boolean;
    joined_on:string;

}

export interface ChatType {
    is_group:boolean;
    created_at:string;
    updated_at:string;
    name:string;
    avatar:string;
    resourcetype:string;
    messages:ChatMessageType[];
}

export interface ConversationType extends ChatType{
    id:number;
    users:MininalUserType[];
    is_online:boolean;
    self_chat:boolean;
    groups_in_common:any;
    latest_message:any;


}

export interface GroupType extends ChatType{
    id:number;
    users:GroupMemberType[],
    latest_message?:MessageType;
    
    description:string;
    created_by:MininalUserType;
    group_icon:string;

}

export interface MessageType {
    id:number;
    created_at:string;
    updated_at:string;
    resourcetype:string;
}

export interface TextMessageType extends MessageType {
    text:string;
}

export interface FileMessageType extends MessageType {
    text:string;
    file:string;
}

export interface StoryReplyMessageType extends MessageType {
    story:any;
    text:string;
    file:string;
}

export interface ChatMessageType {
    id:number;
    chat:ChatType;
    sender:MininalUserType;
    content:TextMessageType | FileMessageType | StoryReplyMessageType;
    parent_message?:ChatMessageType;
    created_at:string;
    updated_at:string;
}

export interface SeenType {
    id:number;
    message:number;
    user:MininalUserType;
    created_at:string;
    updated_at:string;
}

export interface MessageReactionsType {
    id:number;
    message:number;
    reaction:string;
    user:MininalUserType;
    created_at:string;
    updated_at:string;
}

export interface StoryType {
    user:MininalUserType;
    content?:string;
    file?:string;
    created_at:string;
    updated_at:string;
}

export interface StoryViewerType {
    story:number;
    user:MininalUserType;
    created_at:string;
}

export interface ContactType {
    user:number;
    name:string;
    phone_number:string;
}

export interface FriendType {
    user:number;
    friend:MininalUserType;
}

export interface FriendRequestType {
    from_user:number;
    to_user:number;
    timestamp:string;
    is_active:boolean;
    rejected_by:MininalUserType
}

export interface MusicType {
    title:string;
    artist:string;
    genre:string;
    year:number;
    track_number:string;
    file:string;
    owner:MininalUserType;
    created_at:string;
}
