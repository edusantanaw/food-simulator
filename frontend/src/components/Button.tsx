import React, { FunctionComponent } from 'react'

interface funct {
  funct: VoidFunction
}

const Button = ({funct}: funct) => {
  return <button onClick={()=>  funct()} className='bg-violet text-white p-2 text-xl mt-8 rounded-md'>Send</button>

}

export default Button