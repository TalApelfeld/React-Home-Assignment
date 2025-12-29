// import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound404 = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-2 animate-pulse">
            404
          </h1>
          <div className="h-1 w-32 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for seems to have wandered off.
          </p>
          <p className="text-gray-500">
            The page might have been removed, renamed, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {/* <Home size={20} /> */}
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border-2 border-indigo-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {/* <ArrowLeft size={20} /> */}
            Go Back
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            {/* <Search className="text-gray-400" size={20} /> */}
            <h3 className="text-lg font-semibold text-gray-800">
              Try searching instead
            </h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // Handle search - implement your search logic here
                  //   console.log("Search:", e.target.value);
                }
              }}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="text-gray-600 mb-4">You might find these helpful:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Home
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/about"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              About
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/contact"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Contact
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/help"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
