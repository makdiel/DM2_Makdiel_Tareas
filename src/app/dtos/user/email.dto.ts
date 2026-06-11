export interface EmailDto {
    names: string,
    surnames: string | null,
    address:string | null,
    phoneNumber: string,
    email: string,
    password: string,
    fcmToken: string | null,
}