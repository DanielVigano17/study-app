import { StripeRepository } from "@/repositories/stripeRepository";
import { CreateBillingPortal } from "./useCases/biling/createBillingPortal";
import { CreateCustomer } from "./useCases/biling/createCustomer";
import { UserRepository } from "@/repositories/userRepository";
import { CreateSubscription } from "./useCases/biling/createSubscription";
import { FindSubscription } from "./useCases/biling/findSubscription";
import { RetriveProduct } from "./useCases/biling/retriveProduct";
import { UpdateUserUseCase } from "./useCases/updateUser";
import { CreateMateria } from "./useCases/materia/createMateria";
import { MateriaRepository } from "@/repositories/materiaRepository";
import { ListMaterias } from "./useCases/materia/listMaterias";
import { UpdateCustomer } from "./useCases/biling/updateCustomer";
import { UpdateSubscription } from "./useCases/biling/updateSubscription";

const paymentGateway = new StripeRepository();
const userRepository = new UserRepository();
const materiaRepository = new MateriaRepository();

export const modules = {
    useCase : {
        billing : {
            createBillingPortal : new CreateBillingPortal(paymentGateway),
            createCustomer : new CreateCustomer(paymentGateway, userRepository),
            createSubscription : new CreateSubscription(paymentGateway, userRepository),
            findSubscription : new FindSubscription(paymentGateway),
            retriveProduct : new RetriveProduct(paymentGateway),
            updateCustomer : new UpdateCustomer(paymentGateway),
            updateSubscription : new UpdateSubscription(paymentGateway)
        },
        user : {
            updateUser : new UpdateUserUseCase(userRepository)
        },
        materia : {
            createMateria : new CreateMateria(materiaRepository),
            listMaterias : new ListMaterias(materiaRepository, userRepository)
        }
    }
}