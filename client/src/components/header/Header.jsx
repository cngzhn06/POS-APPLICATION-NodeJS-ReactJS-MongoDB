import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cart = useSelector((state) => state.cart);

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz=")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10 ">
        <div className="logo">
          <Link to="/">
            <img src="images/logo.png" alt="" />
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${
              pathname === "/" && "active"
            }`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} className="md:flex hidden">
            <Link
              to={"/cart"}
              className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${
                pathname === "/cart" && "active"
              }`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/invoices"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${
              pathname === "/invoices" && "active"
            }`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${
              pathname === "/customers" && "active"
            }`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${
              pathname === "/statistic" && "active"
            }`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link flex flex-col items-center  hover:text-[#40a9ff] transition-all">
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge count={3} className="md:hidden flex">
          <Link
            to={"/cart"}
            className="menu-link flex flex-col items-center  hover:text-[#40a9ff] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
