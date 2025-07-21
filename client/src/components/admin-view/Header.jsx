import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../UI/button";

function AdminHeader() {
  return (
    <header className="flex items-center justify-end gap-4 px-4 py-2 bg-white shadow w-full">

      <Button className="lg:hidden sm:block" variant="ghost" size="icon">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <Button variant="ghost" size="icon">
        <LogOut />LogOut
      </Button>
    </header>
  );
}

export default AdminHeader;
