import { CreateCustomerDTO, IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { IUserRepository } from "@/domain/interfaces/userInterface";

export class CreateCustomer {

    constructor (private stripeRepository : IPaymentGateway, private updateUser : IUserRepository){}
    async execute(data : CreateCustomerDTO){
        const customerId = await this.stripeRepository.createCustomer(data);
        const user = this.updateUser.update(data.userId,{customerId});
        return user;
    }
}