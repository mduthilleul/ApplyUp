import { Link } from "react-router-dom";
import { useAppliances } from "../contexts/AppliancesContext";

export const AppliancesList = () => {
  const { appliances, removeAppliance } = useAppliances();


  return (
    <div className="flex flex-col">
      {appliances.map((appliance) => (
        <Link to={`/details/${appliance.id}`}>
          {/* Syntax with search params instead of path params:  <Link to={`/details?id=${appliance.id}`}> */}
          <div key={appliance.id} className="border p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{appliance.name}</h2>
            <p className="mb-1">
              <strong>Job:</strong> {appliance.job}
            </p>
            <p className="mb-1">
              <strong>Phone Number:</strong> {appliance.phoneNumber}
            </p>
            <button className="btn btn-error" onClick={(e) => {
              e.preventDefault()
              removeAppliance(appliance.id)
            }}>Supprimer</button>
          </div>
        </Link>
      ))}
    </div>
  );
};
