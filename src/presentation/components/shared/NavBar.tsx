import logo from "@/assets/images/app/logo.svg";

export const NavBar = () => {
    return (
        <nav className="flex justify-between items-center py-5">
            <img src={logo} alt="Logo Weather Now" />

            <div className="flex justify-between items-center gap-3 p-3 bg-brand-800 text-white">
                <p>Units</p>
            </div>
        </nav>
    )
}
