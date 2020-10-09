export interface INotification{
    statusCode: number;
    message: string;
    dismissible: boolean;
    type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark', 
}