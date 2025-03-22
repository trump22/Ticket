import PersonalProfile from "../components/PersonalProfile.jsx";
import BreadCrumb from "../components/BreadCrumb.jsx";

const Profile = () => {

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className={"hidden md:flex w-[30%]  p-4 "}>
                <div className="max-w-md  px-4 md:px-2  mt-8" >
                   <BreadCrumb />
                </div>
            </div>
            <div className={"w-full md:w-[70%] px-6  "}>
                <PersonalProfile/>
            </div>
        </div>
    )
}
export default Profile