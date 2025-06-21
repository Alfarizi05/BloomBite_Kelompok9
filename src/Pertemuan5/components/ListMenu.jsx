import { BsFillPeopleFill } from "react-icons/bs"; 
import { AiOutlineUnorderedList } from "react-icons/ai"; 
import { MdDashboard } from "react-icons/md"; 

export default function ListMenu() {
    return (
<div id="sidebar-menu" className="mt-10">
<ul id="menu-list" className="space-y-3">
    <li>
       
        <div id="menu-1" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"> 
            <MdDashboard  className="mr-4 text-xl"/>Dashboard</div>
    </li>
    <li>
       
        <div id="menu-2" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"> 
            <AiOutlineUnorderedList  className="mr-4 text-xl"/>Orders</div>
    </li>
    <li>
        
        <div id="menu-3" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
            <BsFillPeopleFill  className="mr-4 text-xl"/>Customers</div>
    </li>
</ul>
</div>

    );
}
    