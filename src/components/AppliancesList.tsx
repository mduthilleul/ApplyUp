import { useAppliances } from "../contexts/AppliancesContext";

export const AppliancesList = () => {

 const { appliances } = useAppliances();

  return <div className="flex flex-col">
    {appliances.map(appliance => (
      <div key={appliance.id} className="border p-4 mb-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{appliance.name}</h2>
        <p className="mb-1"><strong>Job:</strong> {appliance.job}</p>
        <p className="mb-1"><strong>Phone Number:</strong> {appliance.phoneNumber}</p>
      </div>
    ))}
  </div>;
}