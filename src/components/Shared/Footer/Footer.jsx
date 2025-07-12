// import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPaw } from "react-icons/fa";
// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <footer className="backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-t-2 border-secondary/15 text-secondary pt-10 pb-6 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* Logo & Description */}
//         <div>
//           <Link to="/" className="text-2xl font-bold flex items-center gap-2">
//             <span><FaPaw /></span> PetAdopt
//           </Link>
//           <p className="mt-4 text-sm">
//             Bringing love home—find your furry friend today. Trusted by hundreds of pet lovers.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link to="/" className="hover:underline">Home</Link></li>
//             <li><Link to="/about" className="hover:underline">About</Link></li>
//             <li><Link to="/adopt" className="hover:underline">Adoption</Link></li>
//             <li><Link to="/contact" className="hover:underline">Contact</Link></li>
//           </ul>
//         </div>

//         {/* Follow Us */}
//         <div>
//           <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
//           <div className="flex gap-4 text-2xl">
//             <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
//             <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
//             <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
//             <a href="mailto:info@petadopt.com"><FaEnvelope /></a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copy */}
//       <div className="text-center text-sm mt-10 border-t border-white/30 pt-4">
//         &copy; {new Date().getFullYear()} PetAdopt. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaw } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-secondary/10 via-white to-secondary/10 text-base-content border-t-2 border-secondary/20 pt-12 pb-6">
      <Container>

      <div className="px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo and Info */}
<div className="lg:col-span-2 md:col-span-3 ">
  <div className="flex items-center gap-2 mb-4 text-2xl font-bold text-secondary">
    <FaPaw />
    <h2 className="">Pet Adoption</h2>
  </div>
  <h3 className="py-4 font-bold text-black text-2xl">Welcome to Pet Adoption</h3>
  <p className="text-sm text-gray-600">
   your trusted platform to find loving homes for adorable pets. <br />
   <span className="text-secondary font-bold">
    We believe every animal deserves a second chance and a forever family.
   </span>
  </p>
  {/* Social Icons */}
  <div className="flex gap-3 mt-4">
    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
      <a
      key={idx}
      href="#"
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
          <h3 className="text-lg font-bold mb-3 text-secondary">Useful Links</h3>
          <ul className="space-y-2 text-sm ">
            <li><Link className="hover:text-secondary" to="/">Home</Link></li>
            <li><Link className="hover:text-secondary" to="/all-pets">Browse Pets</Link></li>
            <li><Link className="hover:text-secondary" to="/my-pets">My Pets</Link></li>
            <li><Link className="hover:text-secondary" to="/add-pet">Add Pet</Link></li>
            <li><Link className="hover:text-secondary" to="/profile">My Profile</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-secondary">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-secondary" to="/faq">FAQs</Link></li>
            <li><Link className="hover:text-secondary" to="/support">Support</Link></li>
            <li><Link className="hover:text-secondary" to="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-secondary" to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-secondary">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail className="text-secondary" /> info@petadoption.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-secondary" /> +880 123-456789
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-secondary" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-12 pt-4 border-t border-dashed border-secondary/20 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} <span className="text-secondary font-bold">Pet Adoption</span>. All rights reserved.
        </p>
      </div>
    </Container>
    </footer>
  );
};

export default Footer;
