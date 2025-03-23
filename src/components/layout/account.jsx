
import Settings from "../account/settings.jsx";
import { Outlet } from "react-router-dom";


const AccountLayout = () => {

    return (
        <div>
            <div className="flex flex-col md:flex-row w-full">
                {/* Cột trái  */}
                {/*{!shouldHideSidebar && (*/}
                <div className="w-full md:w-[30%] p-4">
                    <div className="px-4 md:px-2 mt-4 md:mt-8">
                        <Settings/>
                    </div>
                </div>
                {/*)}*/}

                {/* Cột phải  */}
                <div className="w-full md:w-[70%] px-4 md:px-6 pt-2">
                   <Outlet/>
                </div>
            </div>

            {/* Viền  nội dung thêm bên dưới */}
            <div className="w-full md:w-[90%] mx-auto border-t-2 border-[#d2acf7] mt-8 px-4 md:px-6">
                <h2 className="text-base md:text-lg font-semibold">Thông tin thêm</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                    Film content
                </p>
            </div>

        </div>
    )
}
export default AccountLayout