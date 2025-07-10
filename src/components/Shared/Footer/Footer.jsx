import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPaw } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-lime-600 text-white pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span><FaPaw /></span> PetAdopt
          </Link>
          <p className="mt-4 text-sm">
            Bringing love home—find your furry friend today. Trusted by hundreds of pet lovers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/adopt" className="hover:underline">Adoption</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="mailto:info@petadopt.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copy */}
      <div className="text-center text-sm mt-10 border-t border-white/30 pt-4">
        &copy; {new Date().getFullYear()} PetAdopt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
