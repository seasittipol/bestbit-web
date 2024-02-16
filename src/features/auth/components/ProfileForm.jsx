export default function ProfileForm() {
    return (
        <div className="bg-slate-600 h-40 rounded-lg py-2 px-4 flex gap-4 items-center">
            <img
                className="h-32 w-32 flex-none rounded-full"
                src="https://images.unsplash.com/photo-1707779734349-ef2bba17dfdb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div>
                <p>User name: user1111111</p>
                <p>Email: a@gmail.com</p>
                <p>Mobile: 1231231231</p>
            </div>
        </div>
    )
}
