import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Nvabar/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./Footer";
import Logout from "./pages/Logout";
import { AdminLayout } from "./components/Admin-Layout";
import ProductForm from "./pages/Admin-postService";
import AllServices from "./pages/Admin-services";
import { AdminServiceUpdate } from "./pages/Admin-Serviceupdate";
import NotFound from "./pages/NotFound";
import { AdminContacts } from "./pages/Admin-contacts";
import { AdminUsers } from "./pages/Admin-users";
import { AdminContactUpdate } from "./pages/Admin-updateContact";
import { AdminUserUpadte } from "./pages/Admin-UpdateUser";
// import { AdminContacts } from "./pages/Admin-contacts";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUserUpadte />} />
            <Route path="contacts/:id/edit" element={<AdminContactUpdate />} />

            <Route path="contacts" element={<AdminContacts />} />

            <Route path="postServices" element={<ProductForm />} />
            <Route path="allServices" element={<AllServices />} />
            <Route path="update/:id" element={<AdminServiceUpdate />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
