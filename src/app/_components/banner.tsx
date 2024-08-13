import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const Banner = () => {
  return (
    <div className="bg-bannerColor w-full flex items-center justify-center h-9 py-2">
      <div className="flex items-center justify-between w-72">
        <span><ChevronLeftIcon className="w-4 h-4 text-customGray" /></span>
        <span className="font-medium text-sm">Get 10% off on business sign up</span>
        <span><ChevronRightIcon className="w-4 h-4 text-customGray" /></span>
      </div>
    </div>
  )
}

 
