import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

function AuthForm() {

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    //const navigate = useNavigate();


    useEffect(() => {
        console.log('Email', email)
        console.log("Password", password)
    }, [email, password]);

    const handleSubmitData = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:2022/api/registration', {
                email: email,
                password: password
            });
            //navigate('/')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
        //console.log("This work", {email: email, password: password})
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        console.log(event)
        //setEmail(email: )
        //({email: event.target.email});
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        console.log(event)
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
        <form onSubmit={handleSubmitData}>
            <label >
                Email:
                <input type="email" name="email" value={email} onChange={handleEmail}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={handlePassword} />
            </label>
            <button type="submit">Click on me</button>

        </form>
    )
}

export default AuthForm;