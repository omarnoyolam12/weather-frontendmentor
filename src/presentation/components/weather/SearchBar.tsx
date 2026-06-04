import search from "@/assets/images/icons/icon-search.svg";

export const SearchBar = () => {
    return (
        <form className="flex justify-between items-center gap-5 flex-wrap">
            <label className="flex items-center bg-brand-800 px-5 py-3 grow gap-4 rounded-xl focus-within:ring-1 focus-within:ring-blueapp-500 transition-shadow">
                <img
                    src={search}
                    className="cursor-pointer"
                    alt="Icon Search"
                />

                <input
                    type="text"
                    placeholder="Search for a place..."
                    className="placeholder:text-brand-200 placeholder:font-dmsans text-lg grow focus:outline-none caret-brand-200 text-brand-200 font-dmsans"
                />
            </label>

            <button className="text-white font-dmsans font-light bg-blueapp-500 w-full lg:w-32 p-3 rounded-xl text-lg cursor-pointer hover:bg-blueapp-500/80 transition-all duration-300">
                Search
            </button>
        </form>
    )
}
