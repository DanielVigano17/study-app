import { User } from "@/domain/entities/User";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User; // Certifique-se de que o tipo Session também reflita as mudanças
  }
}
