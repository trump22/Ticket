import {Link} from "react-router-dom";
import {useBreadcrumbItems} from "../../helper/useBreadcrumpItems.jsx";
import {useSelector} from "react-redux";
import kamenrider from '../../assets/images/kamenridermeme.jpg'
    //Breadcumb map để biết được hiển thị giưữa các Link
        // const BREADCRUMB_MAP = {
        //     ticket: {
        //         purchased: "Vé đã mua",
        //         sold: "Vé đã bán"
        //     },
        //     profile: "Thông tin tài khoản",
        //     sellTicket: "Bán vé",
        //     myevent: "Sự kiện của tôi"
        // };
const items = [
    {
        title: 'Thông tin tài khoản',
        logo: 'person',
        to: '/',
    },
    {
        title: 'Lịch sử mua vé',
        logo: 'confirmation_number',
        to: '/ticket/tab',
    },
    {
        title: 'Chỉnh sửa thông tài khoản ',
        logo:'settings',
        to: '/updateProfiles',
    },
    {
        title: 'Tạo sự kiện ',
        logo:'photo_camera',
        to: '/event/create',
    },

]
//File này để tạo đường dẫn Trang chur>Thông tin tài khoản
const Settings = () =>{
    const breadcrumbItems = useBreadcrumbItems();
    const username = useSelector((state) => state.auth.username);
    console.log("Username: " + username);
    const displayName = username && username.trim() !== "" ? username : "Tài khoản của bạn";
    const imgUrl = useSelector((state) => state.auth.imgUrl);



    return(
        <div>
            <div className="text-sm text-muted-foreground px-4 pb-4 ">
                 <span>
        <Link to="/" className="text-gray-500 hover:underline">Trang chủ</Link>
      </span>

                {breadcrumbItems.map((item, index) => (
                    <span key={index}>
      <span className="px-1">{'>'}</span>
                        {item.isLast ? (
                            <span className="text-white font-medium">{item.label}</span>
                        ) : (
                            <Link to={item.href} className="text-gray-500 hover:underline">
                                {item.label}
                            </Link>
                        )}
    </span>
                ))}
            </div>
            <div className={"flex flex-col gap-3"}>
                <div className="flex items-center gap-4">
                    {/* Ảnh bên trái */}
                    <img
                        src={imgUrl || "https://i.pinimg.com/550x/13/e2/9b/13e29b0cce233c21c26b254e9aacc3bc.jpg" }
                        alt="Avatar"
                        className="w-14 h-14 rounded-full object-cover"
                    />

                    {/* Nội dung bên phải ảnh */}
                    <div className="flex flex-col">
                        <p className="text-xs text-muted-foreground">Tài khoản cá nhân</p>
                        <p className="text-lg font-semibold text-white">{displayName}</p>
                    </div>
                </div>
                {items.map((item, index) => (
                    <Link
                        to={item.to}
                        key={index}
                        className="group flex items-center gap-4  transition rounded-xl p-4"
                    >
                        {/*Dung group da kiem soat hover (group la class cha kiem soat (Link) )*/}
                        <span className="material-symbols-outlined text-[32px] text-white">
                         {item.logo}
                        </span>
                        {/*Thang con can phai kiem soat*/}
                        <p className="text-base font-medium text-white group-hover:text-[#ca9bf6]">
                            {item.title}
                        </p>
                    </Link>

                ))}
            </div>
        </div>
    )
}
export default Settings