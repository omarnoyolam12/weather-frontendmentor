import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Text } from '@/presentation/components/shared';
import logo from "@/assets/images/app/logo.svg";

import dropdown from "@/assets/images/icons/icon-dropdown.svg";
import units from "@/assets/images/icons/icon-units.svg";

export const NavBar = () => {
    return (
        <nav className="flex justify-between items-center">
            <img src={logo} alt="Logo Weather Now" />

            <Menu>
                <MenuButton className="inline-flex justify-between items-center gap-2 rounded-md bg-brand-800 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-brand-700 data-open:bg-brand-700 cursor-pointer">
                    <img src={units} alt="Units" />
                    <Text fontType='dm-sans'>Units</Text>
                    <img src={dropdown} alt="Drop" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl border border-brand-600 bg-brand-800 p-2 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                    <Text
                        fontType='dm-sans'
                        className='mb-3 px-3'
                    >
                        Switch ti Imperial
                    </Text>

                    <Text
                        fontType='dm-sans'
                        className='px-3 text-brand-300 text-sm'
                    >
                        Temperature
                    </Text>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            Celcius (°C)
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            Fahrenheit (°F)
                        </button>
                    </MenuItem>

                    <div className='h-px bg-brand-600 my-1' />

                    <Text
                        fontType='dm-sans'
                        className='px-3 text-brand-300 text-sm cursor-pointer'
                    >
                        WindSpeed
                    </Text>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            km/h
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            mph
                        </button>
                    </MenuItem>

                    <div className='h-px bg-brand-600 my-1' />

                    <Text
                        fontType='dm-sans'
                        className='px-3 text-brand-300 text-sm cursor-pointer'
                    >
                        Precipitation
                    </Text>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            Milimeters
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
                            Inch
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </nav>
    )
}
