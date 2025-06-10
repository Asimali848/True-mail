import { useState } from "react";

const faqsData = [
  {
    question: "What services does TanahAir offer?",
    answer: `TanahAir provides a wide range of digital solutions including website development, mobile app creation, and digital marketing strategies. Our team is dedicated to delivering custom solutions for businesses of all sizes. We ensure high quality service with a strong focus on customer satisfaction. Our services are available for startups and enterprises alike.`,
  },
  {
    question: "How can I contact customer support?",
    answer: `You can reach out to our customer support via email, phone, or live chat. Our dedicated team is available 24/7 to assist you with any inquiries. We aim to resolve issues promptly and efficiently. For urgent matters, we recommend using the live chat option. Support details can be found on our Contact Us page.`,
  },
  {
    question: "What is the process for project delivery?",
    answer: `Once you place an order, we schedule a consultation to understand your requirements. Our development team then creates a project plan and timeline. Throughout the process, we provide regular updates and revisions if needed. After your approval, the final product is delivered. Post-delivery support is also available.`,
  },
  {
    question: "Do you offer post-launch support?",
    answer: `Yes, we offer comprehensive post-launch support packages. These include bug fixes, minor updates, and general technical support. We understand the importance of ongoing maintenance for digital products. Our team remains available to ensure your product runs smoothly. Different support tiers are available based on your needs.`,
  },
  {
    question: "Can you customize a package for my business?",
    answer: `Absolutely! We specialize in creating tailored solutions to fit your specific needs. Whether you require a complete digital transformation or just a website redesign, we can customize a package for you. Our consultation team will assess your goals and propose the best solution. Flexibility and personalization are key aspects of our service.`,
  },
  {
    question: "Can you customize a package for my business?",
    answer: `Absolutely! We specialize in creating tailored solutions to fit your specific needs. Whether you require a complete digital transformation or just a website redesign, we can customize a package for you. Our consultation team will assess your goals and propose the best solution. Flexibility and personalization are key aspects of our service.`,
  },
];

const Faqs = () => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const toggleReadMore = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-20 lg:px-20">
      <h1 className="text-2xl font-bold lg:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the
      </p>
      <div className="grid w-full gap-20 lg:grid-cols-2">
        {faqsData.map((faq, index) => {
          const isExpanded = expandedIndexes.includes(index);
          return (
            <div key={index}>
              <h2 className="font-bold lg:text-xl">{faq.question}</h2>
              <p
                className={`overflow-hidden text-xs text-gray-500 transition-all duration-300 ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {faq.answer}
              </p>
              <button
                onClick={() => toggleReadMore(index)}
                className="mt-2 text-primary underline"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;
