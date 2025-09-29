import { useForm } from 'react-hook-form';
import SidePanel from '../components/SidePanel';


export default function Login() {
  document.title = "KhataBook • Signup"

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }
  let pass = '';
  // const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  const passwordRegEx = /^/;

  return (
    <div className="bg-indigo-500 grid grid-cols-1 md:grid-cols-2 h-[90svh]">
      {/* Left branding */}
      <SidePanel page="Signup"/>

      {/* Right form */}
      <div className="flex items-center justify-center rounded-t-4xl bg-no-repeat bg-[length:auto_50%] bg-bottom bg-[url('/images/undraw_quiet-street.png')] bg-white">
        <div className="flex justify-center items-center min-h-[60vh] px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-xs p-8 bg-white rounded-xl shadow-md shadow-gray-400 flex flex-col"
          >
            <h1 className="text-2xl font-semibold text-gray-700 text-center">Sign Up 🔓</h1>
            <div className="input-valid">

              <input
                {...register('name', { required: "name is required." })}
                type="text"
                autoComplete="auto"
                placeholder="Name*"
                className="w-full px-4 py-2 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
            </div>
            <div className="input-valid">

              <input
                {...register('email',
                  {
                    required: "email is required.",
                    validate: (value) => {
                      if (!value.includes('@')) return "enter a valid email.";
                      return true;
                    }

                  })}
                type="text"
                autoComplete="auto"
                placeholder="Email*"
                className="w-full px-4 py-2 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>
            <div className="input-valid">

              <input
                {...register('password', {
                  required: 'password can\'t be empty.', minLength: {
                    value: 6,
                    message: 'password must be 8-15 characters.'
                  },
                  validate: (value) => {
                    if (!passwordRegEx.test(value)) return "atleast upper, lower, special, number";
                    pass = value;
                    return true;
                  }
                })}
                type="password"
                placeholder="Password*"
                className="w-full px-4 py-2 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>
            <div className="input-valid">

              <input
                {...register('confirmpassword', {
                  required: 'confirm password can\'t be empty.',
                  validate: (value) => {
                    if (!(value === pass)) return "passwords doesn't match.";
                    return true;
                  }
                })}
                type="password"
                placeholder="Confirm Password*"
                className="w-full px-4 py-2 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.confirmpassword && <span className='text-red-500 text-sm'>{errors.confirmpassword.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-4 rounded-xl shadow-md cursor-pointer transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
