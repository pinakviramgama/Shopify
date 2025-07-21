import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout(params) {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
               <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet></Outlet>
            </main>
       </div>
    );
}

export default ShoppingLayout;