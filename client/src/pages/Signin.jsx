import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Function to Get form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to save user info to DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if fields are empty
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the fields");
    }

    try {
      setLoading(true);
      setErrorMessage(false);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // show error message
      if (data.success === false) {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
      setLoading(false);

      //Navigate to home page
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div
        className="flex p-3 max-w-3xl mx-auto flex-col
       md:flex-row md:items-center gap-5"
      >
        {/* left */}
        <div className="flex-1">
          {/* Logo */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 rounded-lg text-white"
            >
              Sanuli's
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            You can sign in with your email and password or Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <Label value="Your Password" />
                <TextInput
                  type="password"
                  placeholder="**********"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {/* Sign in option */}
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
