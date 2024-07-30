import React, { useEffect, useState } from 'react'
import "./Services.css"
import { Card } from '../../components/Card/Card.jsx'

export const Services = () => {
    const [services, setServices] = useState([]);

	useEffect(() => {

		fetch("https://tattoo-studio-fornesb.zeabur.app/api/services")
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setServices(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<div className='container row'>
			{services.map((service, index) => (
				<Card id={service.id} key={service.id} title={service.serviceName} description={service.description} />
			))}
		</div>
	);
}
