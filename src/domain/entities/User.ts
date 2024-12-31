export interface User {
    id: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | null;
    customerId? : string | null;
    subscriptionId? : string | null
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }