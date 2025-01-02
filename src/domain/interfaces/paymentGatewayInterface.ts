import { Subscription } from "../entities/Subscription"

export interface CreateCustomerDTO {
    email : string
    name? : string
    userId : string
}


export interface IPaymentGateway {
    createCustomer : (custumer : CreateCustomerDTO) => Promise<string>
    createSubscription : (custumerId : string) => Promise<string>
    findSubscription : (customerId : string) => Promise<Subscription>
}