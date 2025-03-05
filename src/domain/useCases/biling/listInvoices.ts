import { auth } from "@/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";

export class ListInvoices {
    constructor(private paymentGateway: IPaymentGateway) {}

    async execute() {
        try {
            const session = await auth();
            
            if (!session?.user.customerId) {
                throw new Error("Usuário não possui customerId");
            }

            const invoices = await this.paymentGateway.listInvoices(session.user.customerId);
            return invoices;
        } catch (error) {
            console.error("Erro ao listar faturas:", error);
            throw error;
        }
    }
} 