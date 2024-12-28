"use client"

import React, { createContext, PropsWithChildren, ReactNode } from "react"
import { Session } from "next-auth"

// Define as propriedades do contexto
interface AppContextProps {
    session: Session | null
}

// Cria o contexto com o valor padrão
export const ApplicationContext = createContext<AppContextProps>({
    session: null,
})

// Define o componente Provider
interface ApplicationProviderProps {
    session: Session | null
}

export const ApplicationProvider: React.FC<PropsWithChildren<ApplicationProviderProps>> = ({
    children,
    session,
}) => {
    return (
        <ApplicationContext.Provider value={{ session }}>
            {children}
        </ApplicationContext.Provider>
    )
}

