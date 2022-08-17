import React from 'react'
import { useForm } from 'react-hook-form'

let render = 0
export default function Hookform() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  /*
    register這個方法
        parameter1: 帶入字串,可以註冊input onBlur,onChange事件 以及name, ref兩個ObjKey 使表單送出可以取得input的資料
        parameter2: 帶入Obj, 一些標準html的驗證規則 ex { required: true }

    watch這個方法
        將以註冊過的input字串帶入watch參數可以監聽以註冊過的input值
    
    handleSubmit這個方法
        可以先驗證表單是否通過在調用傳入裡面參數的function
    
    errors will return when field validation fails eg. errors.{已註冊過的input字串}

  */
  const onSubmit = data => console.log(data, 'data')
  render =  render + 1
  console.log(render)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <label htmlFor="">FirstName:</label>

        <input className='border ml-5' defaultValue="test" {...register("example")} />
        <br />

        <label htmlFor="">LastName:</label>
        <input className='border ml-5 mt-5' 
        {...register("LastName", 
        { required: '此欄位不可為空' , min:{
            value: 24,
            message: '必須輸入>=24'}, max:{ value:50, message: '必須輸入<=50'}
        })
        } />
        <p className='text-red-600	'>{errors.LastName?.message}</p>


        <br />
        <input className='"border-solid border-2 border-indigo-600' type="submit" />
    </form>
  )
}
