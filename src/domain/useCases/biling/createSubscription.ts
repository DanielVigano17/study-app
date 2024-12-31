import { CreateCustomerDTO, IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { IUserRepository } from "@/domain/interfaces/userInterface";

export class CreateSubscription {

    constructor (private stripeRepository : IPaymentGateway, private updateUser : IUserRepository){}
    async execute(customerId : string , userId : string){
        const subscriptionId = await this.stripeRepository.createSubscription(customerId);
        const user = this.updateUser.update(userId,{subscriptionId});
        return user;
    }
}