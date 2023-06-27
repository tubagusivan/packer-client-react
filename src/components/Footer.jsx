import { logo } from '../assets/img'

const Footer = () => {
   return (
      <footer className='pt-10 pb-4 sticky top-full'>
         <hr className="mt-20 mb-5" />
         <div className="container mx-auto flex justify-between">
            <div id="left" className='w-1/2'>
               <img src={logo} alt="" />
               <p className='w-1/2 text-sm text-slate-400 mt-2'>
                  Packer is a client-server application that helps package maintainers automate building and packaging of the latest upstream version of the software they package.
               </p>
            </div>
            <div id="right" className='w-[30%]'>
               <div id="connect" className='flex flex-col gap-2'>
                  <p>Connect with us :</p>
                  <input type="text" placeholder='Enter your email' className='p-3 border rounded text-sm' />
                  <button className='bg-[#1F43CF] py-2 text-white rounded'>Subscribe</button>
               </div>
            </div>
         </div>
         <hr className='my-4' />
         <div className="container mx-auto">
            <span className='text-xs'>Packer ©2023 | Hacktiv8 Indonesia </span>
         </div>
      </footer>
   )
}

export default Footer