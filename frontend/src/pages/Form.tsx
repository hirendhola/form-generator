/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { id: formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup previews on unmount
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("socialHandle", formData.socialHandle);
      selectedImages.forEach((image) => {
        formDataToSend.append("images", image);
      });

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/submit/${formId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Submission Successful!
          </h2>
          <p className="text-gray-600">Thank you for your submission.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Submit Your Entry
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill out the form below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="socialHandle"
                className="block text-sm font-medium text-gray-700"
              >
                Social Media Handle
              </label>
              <input
                id="socialHandle"
                name="socialHandle"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all"
                value={formData.socialHandle}
                onChange={(e) =>
                  setFormData({ ...formData, socialHandle: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images (Max 5)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-purple-300 cursor-pointer hover:border-purple-500 transition-colors">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="mt-2 text-sm text-gray-600">
                    Click to add images
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={selectedImages.length >= 5}
                  />
                </label>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || selectedImages.length === 0}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Submit Entry"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
