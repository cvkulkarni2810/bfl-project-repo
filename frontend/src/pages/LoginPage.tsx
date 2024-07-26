import logo from "@/assets/bfl_bdd_light.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center py-auto bg-surface">
      <div className="flex flex-col px-48 py-14 gap-10 items-center justify-center bg-white border rounded-3xl shadow-sm">
        <img src={logo} className="w-56" />
        <div className="flex flex-col gap-14">
          <div className="flex flex-col align-middle gap-0">
            <h1 className="px-14 text-center text-stone-800 text-4xl font-extrabold leading-loose">
              Continue with email
            </h1>
            <div className="opacity-80 text-center text-stone-800 text-md font-medium leading-none">
              We'll check if you have an account, and help <br /> create one if
              you don't.
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Label className="text-stone-800 font-semibold text-base">
                Email address (personal or work)
              </Label>
              <Input
                type="email"
                name="email"
                className="px-5 py-6 flex self-stretch text-stone-800"
                placeholder="jenny@example.com"
              />
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Label className="text-stone-800 font-semibold text-base">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                className="px-5 py-6 flex self-stretch text-stone-800"
                placeholder="password"
              />
            </div>
            <Button className="flex self-stretch px-5 py-7 bg-primary rounded-xl font-bold text-lg">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
