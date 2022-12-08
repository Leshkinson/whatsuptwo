import React, {ChangeEvent, FC, useContext, useState} from "react";
//import axios from "axios";
import {Context} from "../../../index";
//import { useNavigate } from "react-router-dom";
import {observer} from "mobx-react-lite";

const AuthForm: FC = () => {

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const {store} = useContext(Context);


    // useEffect(() => {
    //     console.log('Email', email)
    //     console.log("Password", password)
    // }, [email, password]);

    // const handleSubmitData = async (event: SyntheticEvent) => {
    //     event.preventDefault()
    //     try {
    //         await axios.post('http://localhost:2022/api/registration', {
    //             email: email,
    //             password: password
    //         });
    //         //navigate('/')
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             console.log(error.message)
    //         }
    //     }
    //     //console.log("This work", {email: email, password: password})
    // }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        console.log('Something about Email',event)
        //setEmail(email: )
        //({email: event.target.email});
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        console.log('Something about Password', event)
    }

    // const AuthForm = async (event: SyntheticEvent) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post('http://localhost:2022/api/registration', {
    //             email: email,
    //             password: password
    //         });
    //         navigate('/')
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             console.log(error.message)
    //         }
    //     }
    // }


    return (
        //<form onSubmit={handleSubmitData}>
        <div>
            <label >
                Email:
                <input type="email" name="email" value={email} onChange={handleEmail} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={handlePassword} />
            </label>
            <button onClick={() => store.registration(email, password)}>Registration</button>
            <button onClick={() => store.login(email, password)}>Login</button>
        </div>
        //</form>
    )
}

export default observer(AuthForm);