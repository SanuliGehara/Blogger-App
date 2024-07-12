import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function Signup() {
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
            You can sign up with your email and password or Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <div>
            <form className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <Label value="Your Username" />
                <TextInput type="text" placeholder="username" id="username" />
              </div>

              {/* Email */}
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>

              {/* Password */}
              <div>
                <Label value="Your Password" />
                <TextInput type="text" placeholder="password" id="password" />
              </div>

              <Button gradientDuoTone="purpleToPink" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
