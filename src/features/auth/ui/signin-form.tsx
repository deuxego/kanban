import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../auth.service';

export const SigninForm = () => {
  const [isError, setIsError] = useState(false);

  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const handleSignin = () => {
    signIn(fields.email, fields.password, setIsError);
  };

  const handleInput = ({ field, v }: { field: keyof typeof fields; v: string }) => {
    setIsError(false);
    setFields({ ...fields, [field]: v });
  };

  return (
    <div className="container mx-auto p-4 bg-white flex-y-center flex-col text-gray-700">
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
        <h1 className="text-4xl font-semibold ">Welcome back.</h1>
      </div>
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
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
          <div className="pb-2 text-rose-400">Invalid email or password. Please try again.</div>
        )}

        <div className="flex items-center">
          <button
            className="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
            onClick={handleSignin}
          >
            Sign In
          </button>
        </div>

        <div className="flex-y-center gap-1 pt-4">
          <span>Don't have an account?</span>
          <Link to={'/auth/signup'} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
