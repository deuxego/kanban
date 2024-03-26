import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../auth.service';
import { useUserStore } from 'entities/user';

export const SignupForm = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const { setAllUserData } = useUserStore();

  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSignup = () => {
    signUp(fields.username, fields.email, fields.password, setIsError, setAllUserData, navigate);
  };

  const handleInput = ({ field, v }: { field: keyof typeof fields; v: string }) => {
    setIsError(false);
    setFields({ ...fields, [field]: v });
  };

  return (
    <div className="container mx-auto p-4 bg-white flex-y-center flex-col text-gray-700">
      <div className="flex-x-center w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
        <h1 className="text-4xl font-semibold ">Sign up</h1>
      </div>
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
        <input
          className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-500 rounded border focus:border-teal-500"
          type="text"
          placeholder="Username"
          value={fields.username}
          onChange={(e) => handleInput({ field: 'username', v: e.target.value })}
        />
        <input
          className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-500 rounded border focus:border-teal-500"
          type="text"
          placeholder="Email"
          value={fields.email}
          onChange={(e) => handleInput({ field: 'email', v: e.target.value })}
        />
        <input
          className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-500 rounded border focus:border-teal-500"
          type="text"
          placeholder="Password"
          value={fields.password}
          onChange={(e) => handleInput({ field: 'password', v: e.target.value })}
        />

        {isError && (
          <div className="pb-2 text-rose-400">
            An error occurred during registration. Please check your information and try again.
          </div>
        )}

        <div className="flex items-center">
          <button
            className="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>

        <div className="flex-y-center gap-1 pt-4">
          <span>Already have an account?</span>
          <Link to={'/auth/signin'} className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
