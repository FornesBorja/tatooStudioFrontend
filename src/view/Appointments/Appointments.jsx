import React, { useEffect, useState } from "react";
import { Select } from "../../components/Select/Select";
import { createAppointment, getMyAppointments } from "../../services/apiCalls";
import "./Appointments.css";
import { Input } from "../../components/Input/Input";

export const Appointments = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artists, setArtist] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    artistId: "",
    serviceId: "",
    date: "",
  });
  const [error, setError] = useState(null);

  const fullToken = JSON.parse(localStorage.getItem("passport"));
  const token = fullToken?.token;
  console.log(token)
  
  useEffect(() => {
    if (!token) {
      setError("Token no proporcionado");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch("https://tattoo-studio-fornesb.zeabur.app/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError("Token no proporcionado");
      return;
    }

    const fetchArtists = async () => {
      try {
        const response = await fetch("https://tattoo-studio-fornesb.zeabur.app/api/users/artist");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const newArtists = data.data.map((artist) => ({
            id: artist.id,
            firstName: artist.firstName,
          }));
          setArtist(newArtists);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [token]);

  const inputHandler = (e) => {
    if (e.target.value === "") {
      console.log("You cannot pass");
      return;
    }
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!token) {
      setError("Token no proporcionado");
      return;
    }

    const bringAppointments = async () => {
      try {
        const allAppointments = await getMyAppointments(token);
        if (allAppointments.success) {
          setAppointments(allAppointments.data);
        } else {
          setError("Error getting Appointments.");
        }
      } catch (error) {
        setError("Error getting Appointments.");
      }
    };

    bringAppointments();
  }, [token]);

  const todayFullTimeString = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const createAppt = async () => {
    try {
      const response = await createAppointment(newAppointment, token);
      if (response.success) {
        const newData = await getProfileAppointments(token);
        setAppointments(newData.data);
      } else {
        setError("Error creating Appointment.");
      }
    } catch (error) {
      setError("Error creating Appointment.");
    }
  };


  return (
    <div className="container">
      <div className="section">
        <h1>Appointment</h1>
        <div className="appt-container">
          <div className="table-row">
            <div className="content">Appointment date</div>
            <div className="content">Artist</div>
            <div className="content">Service</div>
            <div className="content">Actions</div>
          </div>
          {appointments.map((appt) => (
            <div className="table-row" key={appt.id}>
              <div className="content">{appt.appointmentDate}</div>
              <div className="content">{appt.artistId}</div>
              <div className="content">{appt.serviceId}</div>
              <div className="content">
                <Input
                  type="button"
                  name={appt.id}
                  className="button-send"
                  value="🛇"
                  click={() => deleteUserHandler(appt.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Create appointment</h2>
        <div id="create-appt">
          <input
            type="datetime-local"
            min={todayFullTimeString}
            value={newAppointment.date}
            name="date"
            onChange={inputHandler}
          />
          <Select
            name="serviceId"
            change={inputHandler}
            optionDisable="service"
            array={services}
          />
          <Select
            name="artistId"
            change={inputHandler}
            optionDisable="artist"
            array={artists}
          />
        </div>
        <Input
          name="create-appt-button"
          type="button"
          className="button-send"
          value="Create"
          click={createAppt}
        />
      {error && <div className="error">{error}</div>}

      </div>
    </div>
  );
};
