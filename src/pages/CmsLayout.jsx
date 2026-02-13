import { Outlet } from "react-router";
import CmsNavbar from "../components/CmsNavbar";
import Footer from "../components/Footer";

export default function CmsLayout() {
  return (
    <>
      <div className="bg-zinc-950 min-h-screen text-zinc-200 flex">
        <CmsNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
