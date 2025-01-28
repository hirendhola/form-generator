/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

interface Form {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface Submission {
  id: string;
  name: string;
  social_handle: string;
  image_urls: string[];
  created_at: string;
}

const Admin = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newForm, setNewForm] = useState({ name: "", description: "" });
  const [showNewFormModal, setShowNewFormModal] = useState(false);

  const adminId = localStorage.getItem("token");

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/forms/${adminId}`
      );
      setForms(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSubmissions = async (formId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/forms/${formId}/submissions`
      );
      setSubmissions(response.data);
      setSelectedForm(formId);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createForm = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/forms`, {
        ...newForm,
        adminId,
      });
      setShowNewFormModal(false);
      setNewForm({ name: "", description: "" });
      fetchForms();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyFormLink = (formId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/form/${formId}`);

    alert("Form link copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-2xl shadow-xl p-6 h-[calc(100vh-4rem)]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Forms
            </h2>
            <button
              onClick={() => setShowNewFormModal(true)}
              className="w-full mb-4 bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
            >
              Create New Form
            </button>
            <div className="space-y-2">
              {forms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => fetchSubmissions(form.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedForm === form.id
                      ? "bg-purple-100 text-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {form.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
            {selectedForm ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Submissions
                  </h2>
                  <button
                    onClick={() => copyFormLink(selectedForm)}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    Copy Form Link
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {submissions.length === 0 ? (
                    <p className="font-bold text-red-500">No Submisstion </p>
                  ) : (
                    submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="font-semibold text-lg">
                          {submission.name}
                        </h3>
                        <p className="text-gray-600">
                          {submission.social_handle}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {submission.image_urls.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Submission ${index + 1}`}
                              className="rounded-lg w-full h-32 object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Select a form to view submissions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Form Modal */}
      {showNewFormModal && (
        <div className="fixed inset-0  flex items-center justify-center  bg-opacity-30">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Create New Form</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Form Name
                </label>
                <input
                  type="text"
                  value={newForm.name}
                  onChange={(e) =>
                    setNewForm({ ...newForm, name: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newForm.description}
                  onChange={(e) =>
                    setNewForm({ ...newForm, description: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewFormModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={createForm}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Form"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
