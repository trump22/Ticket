import {Link} from "react-router-dom";
import {useBreadcrumbItems} from "../../helper/useBreadcrumpItems.jsx";
import {useSelector} from "react-redux";
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
        to: '/profile',
    },
    {
        title: 'Vé đã mua',
        logo: 'confirmation_number',
        to: '/ticket/tab',
    },
    {
        title: 'Bán vé',
        logo:'local_activity',
        to: '/',
    },
    {
        title: 'Sự kiện của tôi',
        logo:'photo_camera',
        to: '/',
    },

]
//File này để tạo đường dẫn Trang chur>Thông tin tài khoản
const Settings = () =>{
    const breadcrumbItems = useBreadcrumbItems();
    const username = useSelector((state) => state.auth.username);
    console.log("Username: " + username);
    const displayName = username && username.trim() !== "" ? username : "Tài khoản của bạn";




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
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFW0NbncSWEnZ83TNSs2LnzrIvoLcDCBU2pw&s"
                        alt="Avatar"
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
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