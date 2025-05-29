"use client";
import { FC, useState, useEffect } from 'react';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid';

export const Newsletter: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Thank You modal

  // Generate options for Day, Month, Year dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 126 }, (_, i) => 2025 - i); // 1900 to 2025

  // State to manage form data, errors, and submission
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle input changes with sanitization
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const sanitizedValue = e.target.type === 'text' || e.target.type === 'email' ? value.trim() : value;
    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: '',
    }));
    setSubmitError(null); // Clear server-side errors on input change
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = { firstName: '', lastName: '', email: '' };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle subscription by calling the API
  const handleSubscribe = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setSubmitError(null);

    const birthday = formData.birthdayDay && formData.birthdayMonth && formData.birthdayYear
      ? `${formData.birthdayDay} ${formData.birthdayMonth} ${formData.birthdayYear}`
      : undefined;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthday,
        }),
      });

      setIsLoading(false);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Show Thank You modal
      setIsModalOpen(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        birthdayDay: '',
        birthdayMonth: '',
        birthdayYear: '',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmitError(errorMessage);
      setIsLoading(false);
    }
  };

  // Auto-close modal after 10 seconds
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or modal close
    }
  }, [isModalOpen]);

  return (
    <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
      {/* Heading and Subheading */}
      <h2 className="text-xl md:text-3xl text-center mb-2">
        Add Impact to Your Inbox
      </h2>
      <p className="text-sm md:text-base text-center mb-8">
        Get our emails to stay in the know
      </p>

      {/* Form (always visible) */}
      <div className="space-y-6 my-8 p-4 md:p-9 bg-white border border-[#BCE6CE] rounded-sm">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Birthday Dropdowns */}
        <div>
          <label className="block mb-1">
            Birthday (Optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <select
              id="birthdayDay"
              className="w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              value={formData.birthdayDay}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Day
              </option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              id="birthdayMonth"
              className="w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              value={formData.birthdayMonth}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="birthdayYear"
              className="col-span-2 md:col-span-1 w-full bg-[#E9F7EF] p-3.5 rounded-sm focus outline-none border-none text-sm md:text-base"
              value={formData.birthdayYear}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display Server-Side Error */}
        {submitError && (
          <p className="text-red-500 text-sm md:text-base text-center">{submitError}</p>
        )}

        {/* Subscribe Button */}
        <button
          className="w-full bg-[#F2C94C] text-black py-3 rounded-sm cursor-pointer hover:scale-102 transition-all duration-200 text-sm md:text-base"
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <ArrowPathIcon className=" h-4 w-4 animate-spin mr-2" />
              Subscribing...
            </div>)
            : 'Subscribe'}
        </button>
      </div>

      {/* Thank You Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-full max-w-md mx-4 relative p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 cursor-pointer"
              aria-label="Close"
            >
              <XMarkIcon className="w-4 h-4 bg-[#F2C94C] rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
              Thank You for Subscribing!
            </h3>
            <p className="text-sm md:text-base text-center">
              You’re now part of our community. Expect updates in your inbox soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};