// FromReuseable.jsx
import React from 'react'

const FromReuseable = ({ formTitle, formItem, formplaceholder }) => {
  return (
    <div className=" mx-auto custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 shadow-lg rounded-xl p-8 md:p-10">
      {/* Form Title */}
      <h3 className='font-dm-sans font-bold text-2xl text-gray-900 dark:text-gray-100 leading-8 mb-8'>{formTitle}</h3>

      <form action="">
        {/* Name Field */}
        <div className="mb-6">
          <label className='block font-dm-sans font-semibold text-base text-gray-900 dark:text-gray-100 mb-2'>{'Name'}</label>
          <input 
            className='w-full dark:border-white border-2 border-secondary/15 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition' 
            type="text" 
            placeholder='Your name here' 
            required 
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className='block font-dm-sans font-semibold text-base text-gray-900 dark:text-gray-100 mb-2'>Email</label>
          <input 
            className='w-full dark:border-white border-2 border-secondary/15 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition' 
            type="email" 
            placeholder='Your email here' 
            required 
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label className='block font-dm-sans font-semibold text-base text-gray-900 dark:text-gray-100 mb-2'>{formItem}</label>
          <textarea 
            className='w-full dark:border-white border-2 border-secondary/15 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition' 
            placeholder={formplaceholder} 
            required
            rows={5}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button 
            type='submit' 
            className='w-full py-4 cursor-pointer bg-secondary dark:bg-white text-white dark:text-black font-dm-sans font-bold text-sm rounded-md transition-colors duration-300 hover:bg-secondary/50 dark:hover:bg-gray-200'
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default FromReuseable

