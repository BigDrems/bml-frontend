import Logo from '@/assets/logo.png';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-[30px] shadow-xl overflow-hidden border-2 border-[#90BE54]">
          <div className="bg-gradient-to-r from-[#4F8706] to-[#90BE54] p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-12 h-12" />
              </div>
              <div className="flex flex-row tracking-widest text-2xl font-bold font-roboto-serif">
                <span className='text-white'>L</span>
                <span className='text-[#7EA0CD]'>E</span>
                <span className='text-[#7DE8E8]'>Y</span>
                <span className='text-[#FFF71A]'>T</span>
                <span className='text-[#FD6D6D]'>E</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 font-roboto-serif">{title}</h2>
            <p className="text-green-100 font-roboto">{subtitle}</p>
          </div>
          <div className="p-8">
            {children}
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6 font-roboto">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;