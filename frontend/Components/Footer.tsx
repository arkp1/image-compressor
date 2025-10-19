import { FiGithub } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  return (
<footer className="fixed bottom-0 left-0 w-full p-3 md:p-4 text-center text-xs md:text-sm text-black border-t bg-[#6FA4AF]">
  <div className="flex justify-center items-center gap-1.5 md:gap-2">
    <p>Made by Praneet.|</p>
    <a href="https://github.com/arkp1" target="_blank" rel="noopener noreferrer">
      <FiGithub size={20} className="text-black hover:text-gray-700" />
    </a>
    <a href="mailto:praneet2656@gmail.com" target="_blank" rel="noopener noreferrer">
      <IoMdMail size={20} className="text-black hover:text-gray-700" />
    </a>
  </div>
</footer>


  );
}
