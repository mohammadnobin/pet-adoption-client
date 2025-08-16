// FAQSection.jsx
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Container from "../Shared/Container";

const faqData = [
  {
    question: "How can I adopt a pet?",
    answer: "You can adopt a pet by filling out the adoption form on the pet's details page. Our team will contact you after reviewing your request."
  },
  {
    question: "Do I need to pay to adopt a pet?",
    answer: "Adoption fees may apply depending on the pet and organization. All details are provided in the pet's profile."
  },
  {
    question: "Can I return the pet if I face issues?",
    answer: "Yes, we have a return policy. You can contact our support team for guidance."
  },
  {
    question: "Is there any age restriction for adoption?",
    answer: "Adopters must be at least 18 years old."
  },
  {
    question: "Can I adopt multiple pets at once?",
    answer: "Yes, but each adoption request will be reviewed separately to ensure proper care for each pet."
  },

];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>

      <h1 className="text-5xl text-center pb-10 font-extrabold text-gray-900 mb-4">
            Frequently <span className="text-secondary">Asked Questions</span>
          </h1>

      <div className="space-y-10 mb-[100px]">
        {faqData.map((item, index) => (
          <div key={index} className="custom_gradientl custom_gradientd dark:border-white border-2 border-secondary/15  rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between cursor-pointer items-center px-6 py-4 bcustom_gradientl custom_gradientd text-gray-900 dark:text-gray-100 font-medium focus:outline-none"
            >
              {item.question}
              {activeIndex === index ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 custom_gradientl custom_gradientd text-gray-700 dark:text-gray-200 border-t border-t-secondary">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FAQSection;
