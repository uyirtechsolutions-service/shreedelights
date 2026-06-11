import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import OrderCake from "./pages/OrderCake";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

function WithScrollReset({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  { path: "/",             element: <WithScrollReset><Home /></WithScrollReset> },
  { path: "/menu",         element: <WithScrollReset><Menu /></WithScrollReset> },
  { path: "/order",        element: <WithScrollReset><OrderCake /></WithScrollReset> },
  { path: "/about",        element: <WithScrollReset><About /></WithScrollReset> },
  { path: "/testimonials", element: <WithScrollReset><Testimonials /></WithScrollReset> },
  { path: "/contact",      element: <WithScrollReset><Contact /></WithScrollReset> },
]);
