import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../firebase/firebase.utils";

import "./navigation.styles.scss"

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
    }
   
    return (
        <div>
            <div className="navigation">
                <Link className="logo-container" to="/" > 
                    <Logo className="logo" />
                </Link>
                <div className="links">
                    <Link to="/contact" className="link"> Contact </Link>
                    
                    {
                        currentUser ?
                        <>
                            <Link to="/home" className="link"> Groups </Link>
                            <Link to="/profile" className="link"> My profile </Link>
                            <div className="link" onClick={signOutHandler}> Sign Out </div>
                        </>
                            :
                            <Link to="/auth" className="link"> Sign In </Link>
                    }
                    
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Navigation;