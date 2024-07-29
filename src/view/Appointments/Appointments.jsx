import React, { useEffect, useState } from "react";
import { getMyAppointments } from "../../services/apiCalls";

export const Appointments = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        userId: "", // este viene del token
        serviceId: "", // el servicio lo elegiré de un desplegable
        date: "", // date lo sacaremos de un input type="date" (y opcionalmente input type="time")
      });
    useEffect(() => {
      fetch('https://tattoo-studio-fornesb.zeabur.app/api/services')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          console.error('Expected array but got:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }
    const inputHandler = (e) => {

        if (e.target.value === "Please choose a service") {
            console.log("You cannot pass")
            return
        }
        console.log(e.target.value)
        setNewAppointment({
          ...newAppointment,
          [e.target.name]: e.target.value,
        });
      };
      const todayFullTimeString = new Date()
    .toISOString()
    .slice(0, new Date().toISOString().lastIndexOf(":"));
    return (
        <div className="container">
        <input
        type="datetime-local"
        min={todayFullTimeString}
        value={newAppointment.date}
        name="date"
        onChange={(e) => inputHandler(e)}
      />
      <select name="serviceId" onChange={(e) => inputHandler(e)}>
        <option value="" disabled hidden>
          Please choose a service
        </option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.serviceName}
          </option>
        ))}
      </select>
      </div>
    );
};
