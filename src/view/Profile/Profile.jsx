import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/apiCalls";
import "./Profile.css";
import { Input } from "../../components/Input/Input";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    is_active: null,
    createdAt: "",
  });

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:""
  });
  const [editting, setEditting] = useState(false);

  const passport = JSON.parse(localStorage.getItem("passport"));
  const token = passport.token

  const navigate = useNavigate();

  useEffect(() => {
    if (!passport) {
      navigate("/login");
    } else {
      const bringMyProfile = async () => {
        const response = await getProfile(passport.token);
        setProfileData(response.data);
      };
      bringMyProfile();
    }
  }, []);

  const editButtonHandler = () => {
    setEditData({
      name: profileData.firstName,
      email: profileData.email,
    });
    setEditting(!editting);
  };

  const editInputHandler = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
    console.log("estamos editando", editData);
  };

  const confirmButtonHandler = async () => {
    try {
    const response = await updateProfile(editData, token)
    if (response.success) {
      const newData = await getProfile(token)
      setProfileData(newData.data)
      setEditting(!editting)

    }} catch (err) {
      
      setErrorMessage(err.message)
    }
  } 

  return (
    <div className="container">
      <h2>Hola, {profileData.firstName}</h2>
      <p className={editting ? "hidden" : ""}>
        Name: {profileData.firstName ? profileData.firstName : "No Disponible"}
      </p>
      <Input
        type="text"
        name="firstName"
        placeholder={profileData.firstName}
        className={editting ? "" : "hidden"}
        change={editInputHandler}
      />
      <p className={editting ? "hidden" : ""}>
        Name: {profileData.lastName ? profileData.lastName : "No Disponible"}
      </p>
      <Input
        type="text"
        name="lastName"
        placeholder={profileData.lastName}
        className={editting ? "" : "hidden"}
        change={editInputHandler}
      />
      <p className={editting ? "hidden" : ""}>Email: {profileData.email}</p>
      <Input
        type="email"
        name="email"
        placeholder={profileData.email}
        className={editting ? "" : "hidden"}
        change={editInputHandler}
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        className={editting ? "" : "hidden"}
        change={editInputHandler}
      />
      <Input
        className="button-send"
        type="button"
        name="edit"
        value={editting ? "Cancel" : "Edit"}
        click={editButtonHandler}
      />
      <Input
        type="button"
        
        name="send"
        value="Save changes"
        className={ editting ? "button-send" : "hidden"}
        click={confirmButtonHandler}
      />
    </div>
  );
};