import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { RiRobot2Fill } from "react-icons/ri";
import Homepage from "./components/Homepage";

export default function Home() {
  return (
    <>
      <div className="fixed right-8 sm:right-12 z-20 bottom-8 sm:bottom-12">
        <Link href={"/chat-bot"}>
          <RiRobot2Fill className="text-6xl" />
        </Link>
      </div>
      <div>
        <Navbar />
        <Homepage />
      </div>
    </>
  );
}
