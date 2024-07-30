import React, { useEffect, useState } from "react";
import { Select } from "../../components/Select/Select";
import { getMyAppointments } from "../../services/apiCalls";

export const Appointments = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artists, setArtist] = useState([]);
  const [error, setError] = useState(null);
  // const [appointment, setAppointments] = useState([])
  const [newAppointment, setNewAppointment] = useState({
    artistId: "",
    serviceId: "",
    date: "",
  });
  const fullToken = JSON.parse(localStorage.getItem("passport"));
  const token = fullToken.token;

  useEffect(() => {
    fetch("https://tattoo-studio-fornesb.zeabur.app/api/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://tattoo-studio-fornesb.zeabur.app/api/users/artist")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const newArtists = data.data.map(artist => ({
            id:artist.id,
            firstName: artist.firstName,
          }));
          setArtist(newArtists);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  

  const inputHandler = (e) => {
    if (e.target.value === "") {
      console.log("You cannot pass");
      return;
    }
    console.log(e.target.value);
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   const bringAppointments = async () => {
  //       const allAppointments = await getMyAppointments(token);
  //       if (allAppointments.success) {
  //         setAppointments(allAppointments.data);
  //       } else {
  //         setError("Error getting Appointments.");
  //       }
  //     };
      
  //     bringAppointments();
  //   }, [token]);

  const todayFullTimeString = new Date()
    .toISOString()
    .slice(0, new Date().toISOString().lastIndexOf(":"));

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container">Error fetching data: {error.message}</div>
    );
  }
  return (
    <div className="container">
      {/* <div className="section">
        <h1>Admin</h1>
        <div className="appt-container">
          <div className="table-row">
            <div className="content">Appointment date</div>
            <div className="content">Artist</div>
            <div className="content">Service</div>
            <div className="content">Actions</div>
          </div>
          {appointment.map((appt) => (
            <div className="table-row" key={appt.id}>
              <div className="content">{appt.appointmentDate}</div>
              <div className="content">{appt.artistId}</div>
              <div className="content">{appt.serviceId}</div>
              <div className="content">
                <Input
                  type="button"
                  name={user.id}
                  className="button-send"
                  value="🛇"
                  click={deleteUserHandler}
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="section">
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
    </div>
  );
};
