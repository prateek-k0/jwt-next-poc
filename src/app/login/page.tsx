'use client';

import { loginSubmit } from '@/actions'
import React from 'react'
import { useFormState } from 'react-dom';

const LoginPage = () => {
  const [formState, formDispatch] = useFormState(loginSubmit, { message: '' });
  return (
    <div className='flex flex-col mx-8 mt-16 border rounded-lg border-slate-400 px-8 py-8 gap-8 bg-slate-900'>
      <p className='text-3xl font-semibold'>Login</p>
      {formState.message !== '' && <p className='text-red-500 font-mono text-xl font-semibold'>{formState.message}</p>}
      <form className='flex flex-col gap-8' action={formDispatch}>
        <div className="field flex flex-col gap-2">
          <label htmlFor='username' className='text-md font-sans font-extralight text-slate-400'>Username</label>
          <input type="text" name="username" id="username" placeholder='Username' className='text-white bg-slate-950 px-4 h-12 rounded-md border outline-none w-full' />
        </div>
        <button className="py-2 px-4 rounded-md bg-slate-800 hover:bg-slate-700 border ml-auto submit" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage