import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [formId, setFormId] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formId.trim()) {
      navigate(`/form/${formId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div>
          <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Welcome
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose an option to get started
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
          >
            Register
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="formId"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Form ID
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="formId"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your form ID"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!formId.trim()}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go to Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
