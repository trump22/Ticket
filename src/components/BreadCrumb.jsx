import {Link, useLocation} from "react-router-dom";
const BREADCRUMB_MAP = {
    soldticket: 'Vé đã mua',
    profile: 'Thông tin tài khoản',
    ticketsell: 'Bán vé',
    myevent:"Sự kiện của của tôi"
};
//File này để tạo đường dẫn Trang chur>Thông tin tài khoản
const BreadCrumb = () =>{
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames.length === 0) return null;
    return(
            <div className="text-sm text-muted-foreground px-4 pb-4 ">
                 <span>
        <Link to="/" className="text-gray-500 hover:underline">Trang chủ</Link>
      </span>

                {pathnames.map((segment, index) => {
                    const href = '/' + pathnames.slice(0, index + 1).join('/');
                    const label = BREADCRUMB_MAP[segment] || segment;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <span key={index}>
            <span className="px-1">{'>'}</span>
                            {isLast ? (
                                <span className="text-white font-medium">{label}</span>
                            ) : (
                                <Link to={href} className="text-gray-500 hover:underline">{label}</Link>
                            )}
          </span>
                    );
                })}
            </div>
    )
}
export default BreadCrumb