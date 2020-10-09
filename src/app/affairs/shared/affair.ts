export interface IAffair{
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    rate: number;
    sinceDate: Date;
    availableSeats: number;
    pictureUrl: string;
    ownerName: string;
    ownerSurname: string;
}
