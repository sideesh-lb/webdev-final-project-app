import { React, useState, useEffect } from "react";
import "./profilepages/index.css";
import { update } from "../services/user-service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./profilepages/index.css";
import { useSelector, useDispatch,useStore } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
    changeFirstName,
    changeLastName,
    changeGender,
    changePhoneNumber,
    changeDateOfBirth,
    changeAddress,
} from "../reducers/user-reducer";
import { setLoggedInUser } from "../reducers/user-reducer";
import {findUserByIdThunk} from "../services/user-thunks";

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicUser} = useSelector((state) => state.user)
    const store = useStore();
    const [file, setFile] = useState();
    useEffect(() => {

        console.log("Calling the find user by id dispatch !")
        dispatch(findUserByIdThunk(uid))

    }, []);
    function handleChange(e) {
        console.log(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const { user, loggedIn } = useSelector((state) => state.user);

    const navigate = useNavigate();
    let [isDisabled, setDisabled] = useState(true);
    function goToEditProfile(event) {
        // navigate('../editProfile');
        setDisabled(false);
    }

    function disableEditProfile(event) {
        // navigate('../editProfile');
        setDisabled(true);
    }

    let [fname, setFirstName] = useState({ fname: user.fname });
    const firstNameChangeHandler = (event) => {
        const newFirstName = {
            fname: event.target.value,
        };
        setFirstName(newFirstName);
    };

    let [lname, setLastName] = useState({ lname: user.lname });
    const lastNameChangeHandler = (event) => {
        const newLastName = {
            lname: event.target.value,
        };
        setLastName(newLastName);
    };
    let [phonenumber, setPhoneNumber] = useState({
        phonenumber: user.phonenumber,
    });
    const phoneNumberChangeHandler = (event) => {
        const newPhoneNumber = {
            phonenumber: event.target.value,
        };
        setPhoneNumber(newPhoneNumber);
    };

    let [gender, setGender] = useState({ gender: user.gender });
    const genderChangeHandler = (event) => {
        const newGender = {
            gender: event.target.value,
        };
        setGender(newGender);
    };

    let [dob, setDateOfBirth] = useState({ dob: user.dob });
    const dobChangeHandler = (event) => {
        const newDateOfBirth = {
            dob: event.target.value,
        };
        setDateOfBirth(newDateOfBirth);
    };
    let [address, setAddress] = useState({ address: user.address });
    const addressChangeHandler = (event) => {
        const newAddress = {
            address: event.target.value,
        };
        setAddress(newAddress);
    };

    const dispatch = useDispatch();

    const saveProfile = (e) => {
        e.preventDefault();

        dispatch(changeFirstName(fname));
        dispatch(changeLastName(lname));
        dispatch(changePhoneNumber(phonenumber));
        dispatch(changeGender(gender));
        dispatch(changeDateOfBirth(dob));
        dispatch(changeAddress(address));
        disableEditProfile();
        update(store.getState().user.user).then((res) => {
            if (res.message === "Updated User") {
                alert("User Updated!")
            } else {
                alert("User not updated!");
            }
        });
    };

    function goToBookMarks() {
        navigate("/bookmarks");
    }
    return (
        <>
            {console.log("Public profile is :", publicUser)}
            <div className="profileContainer container mt-2 mb-4">
                <div className="row" style={{marginTop: "5px"}}>
                    <div className="col-10">
                        <h2 style={{float: "left"}}>
                            Public Profile : {publicUser.username}
                        </h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4offset-4">
                        {file == undefined ? (
                            <img
                                width="150px"
                                height="150px"
                                style={{borderRadius: "50%"}}
                                className="text-center"
                                src={require(`../images/profile.png`)}
                            />
                        ) : (
                            <img
                                width="150px"
                                height="150px"
                                style={{borderRadius: "50%"}}
                                className="text-center"
                                src={file}
                            />
                        )}
                    </div>
                </div>
                <br></br>

                <br/>
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    value={publicUser.fname}
                                    type="text"
                                    disabled={isDisabled}
                                    onChange={firstNameChangeHandler}
                                />
                                <Form.Text
                                    className="text-muted"
                                ></Form.Text>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    value={publicUser.lname}
                                    type="text"
                                    disabled={isDisabled}
                                    onChange={lastNameChangeHandler}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3 formValues" controlId="firstName">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    value={publicUser.gender}
                                    type="text"
                                    disabled={isDisabled}
                                    onChange={genderChangeHandler}
                                />

                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    value={publicUser.phonenumber}
                                    type="text"
                                    disabled={isDisabled}
                                    onChange={phoneNumberChangeHandler}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    value={publicUser.dob}
                                    type="date"
                                    disabled={isDisabled}
                                    onChange={dobChangeHandler}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 ">
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    value={publicUser.address}
                                    type="text"
                                    disabled={isDisabled}
                                    onChange={addressChangeHandler}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-4">
                            <button
                                className="btn btn-secondary btn-block rounded-pill"
                                onClick={saveProfile}
                                hidden={isDisabled}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </>

    );
};

export default PublicProfile;
