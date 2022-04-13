import { useState } from "react";

import { signInWithGooglePopup, signInAuthWithEmailAndPassword} from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFromFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
            
       
        try{
            await signInAuthWithEmailAndPassword(email,password);
            resetFromFields();

        }catch(error)
        {
            if (error.code = "auth/wrong-password")
                alert("Incorrect password!");
            console.log(error)
        }

    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <CustomButton type="submit"> Login </CustomButton>
                    <CustomButton buttonType="google" onClick={signInWithGoogle}> Sign in with Google </CustomButton>
                </div>

            </form>
        </div>
    )
}
export default SignInForm;