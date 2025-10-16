import { useForm } from 'react-hook-form';
import SidePanel from '../components/SidePanel';
import { MakeGetRequest } from '../utils/req-backend';


export default function Login({formTarget}) {
  document.title = "KhataBook • Login"

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="bg-indigo-500 grid grid-cols-1 md:grid-cols-2 h-[90svh]">
      {/* Left branding */}
      <SidePanel page="Login" />

      {/* Right form */}
      <div className="flex items-center justify-center rounded-t-4xl bg-no-repeat bg-[length:auto_50%] bg-bottom bg-[url('/images/undraw_quiet-street.png')] bg-white">
        <div className="flex justify-center items-center min-h-[60vh] px-4">
          <form

            onSubmit={handleSubmit(onSubmit)}
            className="w-xs p-8 bg-white rounded-xl shadow-md shadow-gray-400 flex flex-col"
          >
            <h1 className="text-2xl font-semibold text-gray-700 text-center">Login 🔐</h1>
            <div className="input-valid">

              <input
                {...register('username', { required: "Username is required." })}
                type="text"
                autoComplete="auto"
                placeholder="Username*"
                className="w-full px-4 py-2 mt-4 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.username && <span className='text-red-500 text-sm'>{errors.username.message}</span>}
            </div>
            <div className="input-valid">
              <input
                {...register('password', {
                  required: 'password can\'t be empty.'
                })}
                type="password"
                placeholder="Password*"
                className="w-full px-4 py-2 mt-4 bg-gray-50 inset-shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
              {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-4 rounded-xl shadow-md cursor-pointer transition-all"
            >
              Login
            </button>

            <button
              type=""
              className="w-full bg-gray-400 hover:bg-gray-600 text-white font-semibold py-2 px-4 mt-4 rounded-xl shadow-md cursor-pointer transition-all flex justify-center items-center gap-3"
            >
              Login with <img className='h-5 rounded-full' src="https://e7.pngegg.com/pngimages/337/722/png-clipart-google-search-google-account-google-s-google-play-google-company-text-thumbnail.png" alt="google" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
