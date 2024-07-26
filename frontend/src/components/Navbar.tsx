import logo from "@/assets/bfl_bdd_light.svg";
import { Button } from "./ui/button";
import { FileEdit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();

  return (
    <div className="w-screen m-0 px-8 py-4 flex justify-center align-middle bg-background border-b-2 border-b-slate-800/5">
      <div className="flex w-full justify-between align-middle">
        <img src={logo} className="w-28 cursor-pointer" onClick={() => navigator('/')} />
        <Button className="flex gap-2 text-base font-bold text-white">
          <FileEdit className="w-4" />
          Make Report
        </Button>
      </div>
    </div>
  )
}

export default Navbar