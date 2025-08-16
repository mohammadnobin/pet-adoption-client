import React from "react";
import Container from "../Shared/Container";

const AboutUsSection = () => {
  return (
    <section className="py-24 custom_gradientd custom_gradientl">
        <Container>

        {/* Header */}
        <div className="text-center   mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            About <span className="text-secondary">Our Platform</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-white font-medium">
            Connecting loving pet adopters with furry friends in need of a forever home.
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center space-y-8 text-gray-800 dark:text-white text-lg leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-secondary dark:text-white">[Your Website Name]</span>, a passionate initiative dedicated to helping animals find loving families and second chances at happiness.
            Our platform was created to make the pet adoption journey simple, transparent, and joyful for everyone involved.
          </p>

          <p>
            Whether you are looking to adopt a playful puppy or an affectionate cat, our site offers detailed profiles, clear adoption processes, and direct communication channels to connect adopters and shelters seamlessly.
          </p>

          <p>
            Our mission is to reduce stray populations, improve animal welfare, and foster a community of responsible pet ownership.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-20  mx-auto">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-10 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-secondary text-white rounded-full p-4 text-2xl font-bold w-14 h-14 flex items-center justify-center">
                  1
                </div>
              </div>
              <h3 className="font-semibold text-xl dark:text-white">Browse Pets</h3>
              <p className="text-gray-600 dark:text-white">
                Explore profiles of pets available for adoption with photos, stories, and detailed info.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-secondary text-white rounded-full p-4 text-2xl font-bold w-14 h-14 flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="font-semibold text-xl dark:text-white">Choose & Connect</h3>
              <p className="text-gray-600 dark:text-white">
                Select your favorite pet and easily get in touch with the shelter or owner to learn more.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-secondary text-white rounded-full p-4 text-2xl font-bold w-14 h-14 flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="font-semibold text-xl dark:text-white">Adopt & Cherish</h3>
              <p className="text-gray-600 dark:text-white">
                Complete the adoption process, welcome your new companion, and build a lifelong bond.
              </p>
            </div>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="mt-24 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">
            Why We Built This
          </h2>
          <p className="text-gray-700 dark:text-white text-lg leading-relaxed">
            Many loving pets remain homeless and stray due to lack of awareness and easy access to adoption platforms.
            We created <span className="font-semibold text-secondary">[Your Website Name]</span> to bridge this gap and empower animal lovers to find their perfect companions effortlessly.
            Our platform supports shelters, rescues, and individuals working tirelessly to improve the lives of animals.
          </p>
          <p className="text-gray-700 dark:text-white text-lg leading-relaxed">
            Together, we envision a world where every pet has a safe, caring home — and every family experiences the joy and unconditional love only a pet can bring.
          </p>
        </div>

        {/* Team / Community (Optional) */}
        <div className="mt-24  text-center">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-600 dark:text-white max-w-3xl mx-auto mb-8">
            Our passionate team of animal lovers, developers, and volunteers work around the clock to ensure a smooth adoption experience for you and your new friend.
          </p>

          {/* You can add team member cards here or keep it simple */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {/* Example team member */}
            <div className="space-y-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="font-semibold dark:text-white">Jane Doe</p>
              <p className="text-gray-500 dark:text-white text-sm">Founder & CEO</p>
            </div>
            <div className="space-y-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="font-semibold dark:text-white">John Smith</p>
              <p className="text-gray-500 dark:text-white text-sm">Lead Developer</p>
            </div>
            <div className="space-y-2">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="font-semibold dark:text-white">Emma Johnson</p>
              <p className="text-gray-500 dark:text-white text-sm">Community Manager</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <a
            href="/pets"
            className="inline-block bg-secondary text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition"
          >
            Adopt a Pet Today
          </a>
        </div>
     </Container>
    </section>
  );
};

export default AboutUsSection;
