import Header from "../header/Header";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header className="z-0" />

      <div className="z-50">
        {/* Menu */}
        <Menu />

        {/* Page Content */}
        <div className="p-4 pt-20">{children}</div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
