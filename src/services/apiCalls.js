const URL = 'https://tattoo-studio-fornesb.zeabur.app'

export const registerUser = async (credentials) => {
	const request = await fetch(`${URL}/api/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	const result = await request.json();

  return result;
};

export const loginUser = async (credentials) => {
	const request = await fetch(`${URL}/api/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	const result = await request.json();

  return result;
}

export const getProfile = async (token) => {
	const response = await fetch(`${URL}/api/users/profile`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})

	return await response.json()
}

export const updateProfile = async (data, token) => {
	const response = await fetch(`${URL}/api/users/profile`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)})
		
	return await response.json()
}

export const getAllUsers = async (token) => {
	const response = await fetch(`${URL}/api/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})

	return await response.json()
}

export const deleteUserById = async (token, id) => {
	const response = await fetch(`${URL}/api/users/${+id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
	return await response.json()
}
export const getMyAppointments = async (token) => {
	const response = await fetch(`${URL}/api/appointments/user`, {
	  method: "GET",
	  headers: {
		"content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	  },
	});
  
	return await response.json();
  };
export const createAppointment = async (token, data) => {
	if (data.appointmentDate === "" && data.serviceId === null) {
        return console.log("No Appointment date or Service");
    }

    const request = await fetch(`${URL}/api/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({appointmentDate:data.date, serviceId:data.serviceId,artistId:data.artistId}),
    });

    const result = await request.json();

    return result;
  };