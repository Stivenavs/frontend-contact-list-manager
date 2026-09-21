export interface PortalContact {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

export interface PortalContactsResponse {
    success: boolean;
    message: string;
    data: PortalContact[];
}

export interface PortalContactResponse {
    success: boolean;
    message: string;
    data: PortalContact;
}

/** @deprecated keep for auth.service.ts compatibility */
export interface Contact {
    name: string;
    email: string;
}