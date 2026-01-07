import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"

export type Appliance = {
    id: string
    name: string
    phoneNumber: string
    job: string
    description: string
}

type AppliancesContextType = {
    appliances: Appliance[]
    addAppliance: (appliance: Appliance) => void
    removeAppliance: (id: string) => void
}

export const AppliancesContext = createContext<AppliancesContextType>({
    appliances: [],
    addAppliance: () => {},
    removeAppliance: () => {},
});

export const AppliancesProvider = ({children}: PropsWithChildren) => {
    const [appliances, setAppliances] = useState<Appliance[]>([])

    useEffect(() => {
        const storedAppliances = readAppliances();
        setAppliances(storedAppliances);
    }, [])

    return <AppliancesContext.Provider value={{
        appliances,
        addAppliance: (appliance: Appliance) => {
            const newAppliances= [...appliances, appliance]
            setAppliances(newAppliances)
            storeAppliances(appliances)
        },
        removeAppliance: (id: string) => {
            const newAppliances = appliances.filter(a => a.id !== id);
            setAppliances(newAppliances);
            storeAppliances(appliances)
        }
    }}>
        {children}
    </AppliancesContext.Provider>
}

export const useAppliances = () => {
    return useContext(AppliancesContext);
}

const storeAppliances = (appliances: Appliance[]) => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
} 

const readAppliances = (): Appliance[] => {
    const value = localStorage.getItem('appliances');
    if(value) {
        return JSON.parse(value) as Appliance[];
    }
    return [];
}