import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Homepage from "./pages/Homepage";


export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
