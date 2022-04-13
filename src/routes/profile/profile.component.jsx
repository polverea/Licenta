import FormInput from "../../components/form-input/form-input.component";
import { useContext, useState, useRef} from "react";
import { UserContext } from "../../contexts/user.context";
import CustomButton from "../../components/custom-button/custom-button.component";
import { updateYourEmail, updateYourPassword } from "../../firebase/firebase.utils";

const Profile = () => { 
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            alert("Passwords do not match")
    }

    const promises = []
    setLoading(true)

    if (emailRef.current.value !== currentUser.email) {
        updateYourEmail(emailRef.current.value)
    }
    
    if (passwordRef.current.value) {
        updateYourPassword(passwordRef.current.value)
    }

    Promise.all(promises)
      .then(() => {
        console.log("ceva")
      })
      .catch(() => {
        alert("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
   
    return (
        <div>
            <form onSubmit={handleSubmit}>
            {/* <FormInput label="Display Name" type="text"  name="displayName"  defaultValue={"currentUser.displayName"} />
            <FormInput label="Email" type="email"  name="displayName" ref={emailRef} defaultValue={"currentUser.email"} /> 
            <FormInput label="Password" type="password" required ref={passwordRef} name="password" placeholder="parola" />
            <FormInput label="Confirm Password" type="password" ref={passwordConfirmRef} name="confirmPassword" placeholder="parola"/> */}
            <input type="text" ref={emailRef} defaultValue={"currentUser.email"} ></input>
            <input type="password" ref={passwordRef} defaultValue={"currentUser.email"} ></input>
            <input type="password" ref={passwordConfirmRef} defaultValue={"currentUser.email"} ></input>
            <CustomButton type="submit"> Update </CustomButton>
            </form>
        </div>
    )

}

export default Profile;