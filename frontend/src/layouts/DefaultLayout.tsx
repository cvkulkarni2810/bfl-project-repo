import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const DefaultLayout = () => {
  return (
    <div className="w-screen h-full m-0 p-0 flex flex-col overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DefaultLayout