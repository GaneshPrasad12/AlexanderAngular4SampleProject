import { TransactionalInformation } from './transactionalinformation.entity';

export class Customer extends TransactionalInformation {
    public customerID: number;
    public companyName: string;
    public customerCode: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public phoneNumber: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public customers: Array<Customer>;
}
