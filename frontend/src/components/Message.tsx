import React from 'react'

interface msg {
    msg: string
}

export const Message = ({msg}: msg) => {
  return (
    <div className=' absolute top-20 right-28  text-white bg-violet px-10 shadow-md shadow-slate-800 rounded-md  py-5 z-30'><span>{msg}</span></div>
  )
}
