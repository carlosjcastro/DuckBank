import Header from "../header/page";
import Menu from "../menu/page";
import Footer from "../footer/page";
import ServerStatus from "../server-status/ServerStatus";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Menu />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
