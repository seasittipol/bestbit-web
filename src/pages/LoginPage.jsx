import { useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function LoginPage() {
    const [open, setOpen] = useState(false)
    return (
        <div className="mt-10 m-auto bg-gray-700 flex items-center justify-center w-[500px] h-[450px] rounded-lg">
            {!open && <LoginForm onOpen={setOpen} />}
            {open && <RegisterForm onOpen={setOpen} />}
        </div>
    )
}
