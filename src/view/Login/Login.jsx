import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import "./Login.css"
import { loginUser } from "../../services/apiCalls";
import { isTokenValid } from "../../utils/functios";
import { AttempsContext } from "../../context/AttempsProvider";

export const Login = () => {
  const navigate = useNavigate();
  const {number, setNumber}=useContext(AttempsContext)
  const [deshabilitado, setDeshabilitado] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    console.log("HandleChange");
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function login() {
    console.log(credentials);
    try {
      const response = await loginUser(credentials);

      if (response.success) {
        const decodedToken = jwtDecode(response.token);
        const passport = {
          token: response.token,
          tokenData: decodedToken,
        };
        localStorage.setItem("passport", JSON.stringify(passport));
        isTokenValid(decodedToken.exp);
        console.log("Hola")
        navigate("/profile");
        setNumber(0);
      } else {
        setNumber(prevNumber => {
          const nuevoNumero = prevNumber + 1;
          if (nuevoNumero >= 3) {
            setDeshabilitado(true);
            setTimeout(() => {
              setDeshabilitado(false);
            }, 6000); 
          }
          return nuevoNumero;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div  className='container'>
      <h1>Login</h1>
      <Input name="email" label="Introduce your email" change={handleChange} />
      <Input
        name="password"
        type="password"
        label="Introduce your password "
        change={handleChange}
      />
      <Input
        name="login-button"
        type="button"
        className={deshabilitado ? 'button-send disabled' : 'button-send '}
        disable={deshabilitado}
        value={deshabilitado ? 'Esperando...' : 'Login'}
        click={login}
      />
    </div>
  );
};
