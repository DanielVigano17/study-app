import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import Stripe from "stripe";

export interface GetPriceDTO {
    priceId: string;
}

export class GetPriceUseCase {
    constructor(private paymentGateway: IPaymentGateway) {}

    async execute(data: GetPriceDTO): Promise<Stripe.Price | null> {
        try {
            if (!data.priceId) {
                throw new Error("Price ID é obrigatório");
            }

            const price = await this.paymentGateway.getPrice(data.priceId);
            return price;
        } catch (error) {
            console.error("Erro ao buscar preço:", error);
            return null;
        }
    }
}
