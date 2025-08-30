
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaw,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Container from "../Container";

const Footer = () => {

    const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/mohammad.nobin.581840" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/mdnobin/" },
    { icon: FaInstagram, url: "https://www.instagram.com/nobinnajrulislam/" },
    { icon: FaTwitter, url: "#" },
  ];

  return (
    <footer className="custom_gradientd custom_gradientl dark:border-white text-base-content border-t-2 border-secondary/20 pt-12 pb-6">
      <Container>
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Logo and Info */}
          <div className="lg:col-span-2 md:col-span-3 ">
            <div className="flex items-center gap-2 mb-4 text-2xl font-bold dark:text-white text-secondary">
              <FaPaw />
              <h2 className="">Pet Adoption</h2>
            </div>
            <h3 className="py-4 font-bold text-black dark:text-white text-2xl">
              Welcome to Pet Adoption
            </h3>
            <p className="text-sm dark:text-white text-gray-600">
              your trusted platform to find loving homes for adorable pets.{" "}
              <br />
              <span className="text-secondary dark:text-white font-bold">
                We believe every animal deserves a second chance and a forever
                family.
              </span>
            </p>
            {/* Social Icons */}
<div className="flex gap-4 pt-4">
      {socialLinks.map(({ icon: Icon, url }, idx) => (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform text-secondary bg-white p-2 rounded-full border border-secondary"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-3 dark:text-white text-secondary">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm ">
              <li>
                <Link className="hover:text-secondary dark:text-white" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/all-pets"
                >
                  Browse Pets
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/my-pets"
                >
                  My Pets
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/add-pet"
                >
                  Add Pet
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/profile"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-3 dark:text-white text-secondary">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/faq"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/support"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary dark:text-white"
                  to="/terms"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-3 dark:text-white text-secondary">
              Contact
            </h3>
            <ul className="space-y-3 text-sm dark:text-white">
              <li className="flex items-center gap-2">
                <MdEmail className="text-secondary dark:text-white" />{" "}
                info@petadoption.com
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-secondary dark:text-white" /> +880
                123-456789
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-secondary dark:text-white" />{" "}
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 pt-4 border-t border-dashed border-secondary/20 dark:border-white text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-secondary font-bold">Pet Adoption</span>. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
