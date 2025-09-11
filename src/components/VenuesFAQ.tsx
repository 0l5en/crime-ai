const VenuesFAQ = () => {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started with a custom venue case?",
          answer: "Simply sign up for our 7-day free trial. You'll provide details about your venue, and our team will create a custom mystery case tailored to your specific location and guest experience goals."
        },
        {
          question: "What information do you need about my venue?",
          answer: "We'll need basic details like your venue type, layout, unique features, target guest demographics, and any special characteristics that make your property unique. This helps us craft the perfect mystery experience."
        },
        {
          question: "How long does it take to create my custom case?",
          answer: "Your exclusive custom case is generated and delivered within 24 hours after you complete your venue registration. We use advanced AI to create a unique mystery tailored to your specific property."
        }
      ]
    },
    {
      category: "Bookings & Cancellations",
      questions: [
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your case will remain active until the end of your current billing period."
        },
        {
          question: "What happens during the 7-day free trial?",
          answer: "During your free trial, you'll get full access to our platform, custom case creation, and all features. You can cancel before the trial ends to avoid charges."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee if you're not satisfied with your custom case. We're confident you'll love the results, but your satisfaction is our priority."
        }
      ]
    },
    {
      category: "Analytics & Stats",
      questions: [
        {
          question: "What kind of analytics do you provide?",
          answer: "You'll get detailed insights including guest engagement rates, completion statistics, average play time, guest feedback scores, and seasonal performance trends to help optimize your guest experience."
        },
        {
          question: "How do I track guest participation?",
          answer: "Our platform provides real-time tracking of guest interactions, including who's playing, how far they've progressed, and their satisfaction ratings. Perfect for understanding your ROI."
        },
        {
          question: "Can I see guest reviews and feedback?",
          answer: "Yes, you'll have access to anonymous guest feedback and ratings through your dashboard, helping you understand what guests love most about their mystery experience."
        }
      ]
    },
    {
      category: "Support & Technical Details",
      questions: [
        {
          question: "What support do you offer?",
          answer: "We provide 24/7 customer support via email and chat. Our team helps with setup, troubleshooting, case updates, and any questions about maximizing your guest experience."
        },
        {
          question: "How do guests access the mystery case?",
          answer: "Guests simply scan a unique QR code you'll display in your venue. This gives them instant access to their mystery adventure on any smartphone or tablet - no app downloads required."
        },
        {
          question: "Can you update or modify my case over time?",
          answer: "Absolutely! We can create seasonal variants, update storylines, or modify cases based on guest feedback. This keeps the experience fresh for repeat visitors."
        }
      ]
    }
  ];

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">Frequently Asked Questions</h2>
            <p className="lead">
              Everything you need to know about creating custom venue mystery cases.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-5">
                <h3 className="text-primary-custom mb-4 border-bottom border-danger pb-2">
                  {category.category}
                </h3>
                <div className="accordion" id={`faq-${categoryIndex}`}>
                  {category.questions.map((faq, questionIndex) => (
                    <div key={questionIndex} className="accordion-item bg-secondary border-dark">
                      <h4 className="accordion-header">
                        <button
                          className="accordion-button collapsed bg-secondary text-light border-0"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-${categoryIndex}-${questionIndex}`}
                          aria-expanded="false"
                        >
                          {faq.question}
                        </button>
                      </h4>
                      <div
                        id={`faq-${categoryIndex}-${questionIndex}`}
                        className="accordion-collapse collapse"
                        data-bs-parent={`#faq-${categoryIndex}`}
                      >
                        <div className="accordion-body text-light bg-dark">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesFAQ;