import logo from "../assets/Chef-Icon.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="chef-logo" />
      <h1>Chef Markos</h1>
    </header>
  );
}

export default Header;
