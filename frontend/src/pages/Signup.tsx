import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Signup = () => {
    useAuthRedirect();
    return <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
            <Auth cardType="signup"/>
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </div>
}

export default Signup;