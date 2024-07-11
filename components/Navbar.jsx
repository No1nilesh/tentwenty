import Button from "./Button";

export default function Navbar() {
  return (
    <header className="absolute z-50 top-0 md:top-5 w-full">
      <nav className="w-full md:w-[95%] p-7  bg-primary-color text-primary-text mx-auto flex justify-between">
        <ul className="hidden md:flex items-center gap-x-4">
          <li>About</li>
          <li>News</li>
          <li>Services</li>
          <li>Our Team</li>
          <li>Make Enquiry</li>
        </ul>
        <Button text="Contact Us" />
      </nav>
    </header>
  );
}
