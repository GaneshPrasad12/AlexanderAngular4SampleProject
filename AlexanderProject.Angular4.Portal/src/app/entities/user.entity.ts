import { TransactionalInformation } from './transactionalinformation.entity';

export class User extends TransactionalInformation {
    public userID: number;
    public firstName: string;
    public lastName: string;
    public emailAddress: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;     
    public state: string;
    public zipCode: string;
    public password: string;    
    public passwordConfirmation: string;
    public dateCreated: Date;
    public dateUpdated: Date;
}

