import { bodyImage, checkIcon, containerIcon, heroImage, logobanner, modularIcon, simpleIcon } from '../assets/img/index'
import { BiCloudUpload, BiLayout } from "react-icons/bi";
import { FaDocker, FaServer } from "react-icons/fa";

const Home = () => {
    return (
        <div id="Home" className='min-h-screen'>
            <div id="hero" className='my-10'>
                <div className="container mx-auto flex items-center">
                    <div className="left w-1/2 flex flex-col">
                        <div id="topbutton" className='flex gap-3'>
                            <span className='flex items-center gap-2 bg-[#B9D5FF] border border-[#1F43CF] px-3 py-1 rounded-full'>
                                <img src={simpleIcon} alt="" />
                                <p className='font-medium text-xs text-[#1F43CF]'>Simple</p>
                            </span>
                            <span className='flex items-center gap-2 bg-[#B9D5FF] border border-[#1F43CF] px-3 py-1 rounded-full'>
                                <img src={containerIcon} alt="" />
                                <p className='font-medium text-xs text-[#1F43CF]'>Containerized</p>
                            </span>
                            <span className='flex items-center gap-2 bg-[#B9D5FF] border border-[#1F43CF] px-3 py-1 rounded-full'>
                                <img src={modularIcon} alt="" />
                                <p className='font-medium text-xs text-[#1F43CF]'>Modular</p>
                            </span>
                        </div>
                        <div id="heroTitle">
                            <h1 className='text-5xl font-bold leading-tight text-slate-800'>Automate Your Boring Package Maintainer Routines</h1>
                        </div>
                        <div id="subtitle" className='mt-5 mb-10 w-4/5'>
                            <p>
                                Let Packer keep track of the latest GitHub release of the application you package and create a build task for it so Packer can run your build scripts for you in a Docker container for a clean and reproducible environment.
                            </p>
                        </div>
                        <div id="heroButton" className='mb-10'>
                            <button className='bg-[#1F43CF] py-2 px-10 rounded-sm text-white font-medium'>Start Now - It’s Free</button>
                        </div>
                        <div id="heroCheck" className='flex items-center gap-5'>
                            <div className="left flex flex-col gap-2">
                                <span className='flex gap-2'>
                                    <img src={checkIcon} alt="" />
                                    <p>Simple Interface</p>
                                </span>
                                <span className='flex gap-2'>
                                    <img src={checkIcon} alt="" />
                                    <p>Can Be Self-hosted</p>
                                </span>
                            </div>
                            <div className="right flex flex-col gap-2">
                                <span className='flex gap-2'>
                                    <img src={checkIcon} alt="" />
                                    <p>All tasks are run in a Docker container</p>
                                </span>
                                <span className='flex gap-2'>
                                    <img src={checkIcon} alt="" />
                                    <p>Server Can Be in Separate Server</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id='imghero' className="right">
                        <img src={heroImage} alt="" />
                    </div>
                </div>
            </div>
            <div id="trusted" className='mb-16'>
                <div className="container mx-auto text-slate-800">
                    <hr />
                    <div id="content" className='flex justify-between items-center my-8'>
                        <div className="title">
                            <h3 className='w-4/5 font-medium text-xl'>Trusted by many package maintainers</h3>
                        </div>
                        <div className="count flex gap-4">
                            <span className='flex flex-col justify-start'>
                                <p className='text-base font-semibold'>+10.000</p>
                                <p className='text-xs'>Active User</p>
                            </span>
                            <span className='flex flex-col justify-start'>
                                <p className='text-base font-semibold'>+6.000</p>
                                <p className='text-xs'>Hours Saved</p>
                            </span>
                            <span className='flex flex-col justify-start'>
                                <p className='text-base font-semibold'>+100.000</p>
                                <p className='text-xs'>Task Automated</p>
                            </span>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            <div id="fiture" className='mb-24'>
                <div className="container mx-auto">
                    <div id="headerTitle" className='flex justify-between mb-10'>
                        <div id="left" className='w-1/2'>
                            <h1 className='text-2xl font-semibold'>Trusted By Many Package Maintainers Around the World</h1>
                        </div>
                        <div id="riht" className='flex justify-end'>
                            <p className='w-4/5 text-sm'>Packer has helped many volunteer package maintainers around the world who can only work on it on their spare time.</p>
                        </div>
                    </div>
                    <div id="cards" className='grid grid-cols-2 gap-4'>
                        <div id="cardFiture" className='p-6 shadow rounded-md border'>
                            <div id="icon">
                                <BiLayout className="containerIcon w-[50px] h-[50px] rounded-full bg-[#B9D5FF] p-3 text-[#1F43CF]" />
                            </div>
                            <div id="title">
                                <h4 className='text-base text-slate-800 font-semibold my-2'>Simple Interface</h4>
                                <p className='text-slate-600 text-sm'>
                                    Packer tries to have a simple and clean interface. A tool should be simple and get out of the user&apos;s way.
                                </p>
                            </div>
                        </div>
                        <div id="cardFiture" className='p-6 shadow rounded-md border'>
                            <div id="icon">
                                <BiCloudUpload className="containerIcon w-[50px] h-[50px] rounded-full bg-[#B9D5FF] p-3 text-[#1F43CF]" />
                            </div>
                            <div id="title">
                                <h4 className='text-base text-slate-800 font-semibold my-2'>Can Be Self-hosted</h4>
                                <p className='text-slate-600 text-sm'>
                                    The server and client part can be placed on different servers. The Docker Engine that will run the tasks can also be run on different server.
                                </p>
                            </div>
                        </div>
                        <div id="cardFiture" className='p-6 shadow rounded-md border'>
                            <div id="icon">
                                <FaDocker className="containerIcon w-[50px] h-[50px] rounded-full bg-[#B9D5FF] p-3 text-[#1F43CF]" />
                            </div>
                            <div id="title">
                                <h4 className='text-base text-slate-800 font-semibold my-2'>Run in a Docker container</h4>
                                <p className='text-slate-600 text-sm'>
                                    All tasks are run inside a Docker container, from the image of your choosing, so your build scripts are run in a clean and reproducible environment.
                                </p>
                            </div>
                        </div>
                        <div id="cardFiture" className='p-6 shadow rounded-md border'>
                            <div id="icon">
                                <FaServer className="containerIcon w-[50px] h-[50px] rounded-full bg-[#B9D5FF] p-3 text-[#1F43CF]" />
                            </div>
                            <div id="title">
                                <h4 className='text-base text-slate-800 font-semibold my-2'>Server Can Be in Separate Server</h4>
                                <p className='text-slate-600 text-sm'>
                                    The Docker Engine that Packer will use to run your tasks does not need to run on the same host as the Packer server, so you can run the Docker Engine on a more powerful system to speed-up build times.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="strength" className='mb-24'>
                <div className="container mx-auto">
                    <div id="title" className='flex justify-center'>
                        <h1 className='w-1/2 text-center text-2xl font-semibold'>Easily Integrate Packer into Your Workflow. No Need to Throw Away Your Existing Worfklow!</h1>
                    </div>
                    <hr className='border-2 rounded-full mt-5 w-1/4 mx-auto' />
                    <div id="content" className='flex justify-between items-center'>
                        <div className="left w-1/2">
                            <img src={bodyImage} className='w-4/5' alt="" />
                        </div>
                        <div className="right flex flex-col gap-5 w-1/2">
                            <div id="items" className='border-l-4 border-[#08207d] p-3'>
                                <h3 className='text-xl font-semibold text-[#1F43CF]'>Simple</h3>
                                <p className='text-slate-700'>Packer is designed from the beginning to be simple to use and integrate to your existing workflow.</p>
                            </div>
                            <div id="items" className='border-l-4 border-[#08207d] p-3'>
                                <h3 className='text-xl font-semibold text-[#1F43CF]'>Containerized</h3>
                                <p className='text-slate-700'>All tasks are run inside a Docker container, so your build scripts are run in a clean and reproducible environment. No need to install any dependencies other than Docker!</p>
                            </div>
                            <div id="items" className='border-l-4 border-[#08207d] p-3'>
                                <h3 className='text-xl font-semibold text-[#1F43CF]'>Modular</h3>
                                <p className='text-slate-700'>The server and client part of Packer are separate so they can be run on separate servers. Additionally, the Docker Engine that Packer will use to run your tasks does not need to run on the same host as the Packer server, so you can run the Docker Engine on a more powerful system to speed-up build times.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="banner" className='bg-[#1F43CF] py-36'>
                <div className="container mx-auto text-center">
                    <div className="logo flex justify-center">
                        <img src={logobanner} alt="" />
                    </div>
                    <div id="title">
                        <h1 className='text-4xl font-semibold text-white text-center my-2 mx-auto'>Start having more time to rest at your weekend now!</h1>
                        <p className='text-white'>All our code are open source! You can see the code for the client here and the server here</p>
                    </div>
                    <div id="actions">
                        <button className='bg-white py-2 px-10 rounded mt-4 text-[#1F43CF] font-semibold'>Start Now - It&apos;s Free</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home