import React, { useState } from "react";
import { ServiceInterface } from "../models/models";
interface ServicePurchaseFormProps {
  onSubmit: (formData: ServiceInterface) => void;
}

export const ServicePurchaseForm: React.FC = () => {
  //   const [formData, setFormData] = useState<ServiceInterface>(null);

  //   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     onSubmit(formData);
  //   };

  return (
    <h1>HUJ SERWISY</h1>
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Service Name:
    //     <input
    //       type="text"
    //       name="serviceName"
    //       value={formData.serviceName}
    //       onChange={handleInputChange}
    //     />
    //   </label>
    //   <label>
    //     Service Type:
    //     <input
    //       type="text"
    //       name="serviceType"
    //       value={formData.serviceType}
    //       onChange={handleInputChange}
    //     />
    //   </label>
    //   <label>
    //     Service Price:
    //     <input
    //       type="number"
    //       name="servicePrice"
    //       value={formData.servicePrice}
    //       onChange={handleInputChange}
    //     />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
  );
};
