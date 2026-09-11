import * as React from 'react';


export default function ButtonAppBar(props) {

  const toggleMode = () => {
    props.mode.current === 'light' ? props.mode.setMode('dark') : props.mode.setMode('light')
  }

  return (
    <nav className=" bg-indigo-500 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center ">

            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button type="button" onClick={(e) => { toggleMode() }} className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" >
              <span className="sr-only">Change Mode</span>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="currentColor" />
                <path fill-rule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" />
              </svg>
            </button>



          </div>
        </div>
      </div>


    </nav>



  );
}


/*
MOBILE MENU TO BE ADDED


      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">

          <a href="#" className="bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

          <a href="#" className="text-gray-300 hover:bg-indigo-700 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">More features</a>

          <a href="#" className="text-gray-300 hover:bg-indigo-700 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">to come</a>

          <a href="#" className="text-gray-300 hover:bg-indigo-700 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">... soon</a>
        </div>
      </div>

*/