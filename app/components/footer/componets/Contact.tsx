import Image from 'next/image'
import React from 'react'

export const Contact = () => {
  return (
     <div className="flex flex-col p-4">
      <h1 className="font-bold">Contact</h1>
      <p>Telephone: 703-832-7954</p>
      <p>Email: boorchibat@gmail.com</p>
      <div className='mt-5 flex gap-x-5'>
<div className='rounded-4xl bg-yellow-100 items-center flex justify-center w-[40px] h-[40px]'>
<Image src="../github.svg" alt='image' width={20} height={20}/>
</div>
<div  className='rounded-4xl bg-yellow-100 justify-center flex items-center w-[40px] h-[40px]'>
<Image src="../insta.svg" alt='image' width={20} height={20}/>
</div>
      </div>
    </div>
  )
}
