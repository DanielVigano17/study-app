import { auth } from "@/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { Subscription } from "@/domain/entities/Subscription";

export class CheckSubscriptionStatus {
    constructor(private paymentGateway: IPaymentGateway) {}

    async execute(): Promise<{
        isActive: boolean;
        subscription: Subscription | null;
        error?: string;
    }> {
        try {
            const session = await auth();
            
            if (!session?.user.subscriptionId) {
                return {
                    isActive: false,
                    subscription: null,
                    error: "Usuário não possui assinatura"
                };
            }

            const subscription = await this.paymentGateway.findSubscription(session.user.subscriptionId);

            if (!subscription) {
                return {
                    isActive: false,
                    subscription: null,
                    error: "Assinatura não encontrada"
                };
            }

            const isActive = subscription.status === "active" || subscription.status === "trialing";

            return {
                isActive,
                subscription
            };

        } catch (error) {
            console.error("Erro ao verificar status da assinatura:", error);
            return {
                isActive: false,
                subscription: null,
                error: "Erro ao verificar status da assinatura"
            };
        }
    }
} 