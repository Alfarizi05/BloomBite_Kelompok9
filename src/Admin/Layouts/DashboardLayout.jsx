// import AdminSidebar from "../Components/AdminSidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div
//       className="font-sans antialiased min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
//       // style={{ backgroundImage: "url('/img/black.jpg')" }}
//     >
//       <AdminSidebar />

//       <main className="ml-64 p-8 text-white min-h-screen">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="font-sans antialiased min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
      <AdminSidebar />
      <main className="ml-64 p-8 text-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
