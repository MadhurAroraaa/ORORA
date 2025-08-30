import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { toast } from 'react-toastify';


const Contact = () => {


 const {register, reset, handleSubmit} = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = "f0f77d93-9553-4475-838d-5087bd1cb446";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
      // ... other settings
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      toast.success('Form submitted successfully!');
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
      toast.error('Error submitting form!');
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-300 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className=" bg-black/50 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-white text-center mb-10">Get in Touch with <span className="text-yellow-500">ORORA</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-white space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300">Have a question or need support? We're here to help you with your electronics journey.</p>
            </div>
            <div>
              <p><strong>📍 Address:</strong>Chowk Bazaar, Jagadhri, India</p>
              <p><strong>📧 Email:</strong> <a href="mailto:aroramadhur0248@gmail.com">aroramadhur0248@gmail.com</a></p>
              <p><strong>📞 Phone:</strong><a href="telto:7419190554">7419190554</a></p>
            </div>
          </div>

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input type="text" {...register("name", { required: true })} placeholder="Madhur Arora" className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input type="email" placeholder="madhur@example.com" className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("email", { required: true })}/>
            </div>
            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea rows="4" placeholder="Type your message..." className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("message", { required: true })}></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-yellow-600 to-slate-900 text-white hover:from-slate-900/50 hover:to-yellow-600/50 transition duration-500 font-semibold py-2 rounded-xl ">
              Send Message 🚀
            </button>
          </form>


        </div>
      </div>

    </div>
  );
};

export default Contact;