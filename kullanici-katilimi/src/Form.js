import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


const signUpSchema = yup.object().shape({
    name: yup
            .string()
            .trim()
            .required(" Lütfen isim giriniz.")
            .min(3,"3 harften az olamaz."),

    lastname: yup
            .string()
            .trim()
            .required(" Lütfen isim giriniz.")
            .min(3,"3 harften az olamaz."),

    email:yup
            .string()
            .email(" Lütfen geçerli bir mail adresi giriniz.")
            .required(" Lütfen email adresi giriniz"),

    password:yup
            .string()
            .required(" Lüften şifre oluşturunuz")
            .min(8," Şifreniz en az 8 karakter olmalı"),
    terms:yup
        .boolean()
        .oneOf([true],"Onay kutucuğunu işaretleyiniz.")
           
})
function Form() {

    const [valid,setValid]=useState(false);
    const [users,setUsers]=useState([])

    const [errorData,setErrorData]=useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        terms:""
    })

    const [user,setUser]=useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        terms:false
    }) 

      const validation = (name,value) => {
        
        yup.reach(signUpSchema,name)
        .validate(value)
        .then(()=>setErrorData({...errorData,[name]:""}))
        .catch((err)=>setErrorData({...errorData,[name]:err.errors[0]}))
            
      };
     
    const formSubmit=(e)=>{
        e.preventDefault();
        
        if(valid){
        axios.post('https://reqres.in/api/users',user)

            .then((response)=>{
                setUsers([...users,response.data])
                setUser({
                    name:"",
                    lastname:"",
                    email:"",
                    password:"",
                    terms:false
                })
                setValid(false)
            }
            )
        }
    }

    const formChangeHandler=(e)=>{
        const {type,value,name,checked}=e.target;
         

        if(type==="checkbox"){
            setUser({...user,[name]:checked})
             validation(name,checked)
        }
        else{
            setUser({...user,[name]:value})
            validation(name,value)
             
        }
        
    }
    useEffect(()=>{
        signUpSchema
            .isValid(user)
            .then((rest)=>setValid(rest))
            .catch((rest)=>setValid(!rest))
    },[user])

    return(
        <div>
        <form onSubmit={formSubmit}>
            <div className="input-row">
                <label htmlFor="name">First name:</label>
                <input id="name" name="name" type="text" value={user.name} onChange={formChangeHandler} />
                {errorData.name && <div className="error">Hata : {errorData.name}</div>}
            </div>
            <div className="input-row">
                <label htmlFor="lastname">Last name:</label>
                <input id='lastname' name="lastname" type="text" value={user.lastname} onChange={formChangeHandler}/>
                {errorData.lastname &&<div className="error">Hata : {errorData.lastname}</div>}
            </div>
            <div className="input-row">
                <label htmlFor="email">E-mail:</label>
                <input id="email" name="email" type="text" value={user.email} onChange={formChangeHandler}/>
                {errorData.email && <div className="error">Hata : {errorData.email}</div>}
            </div>
            <div className="input-row">
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password"  value={user.password} onChange={formChangeHandler}/>
                {errorData.password &&<div className="error">Hata : {errorData.password}</div>}
            </div>
            <div className="input-row">
                <label htmlFor="terms">Approve:</label>
                <input id="terms" name="terms" type="checkbox"  checked={user.terms} onChange={formChangeHandler}/>
                {errorData.terms &&<div className="error">Hata : {errorData.terms}</div>}
            </div>
            <div className="input-row">
                <button type="submit" disabled={!valid} value="Submit">Kayıt Ol</button>
            </div>
            
        </form>
        {users.map((item)=>(
            <p>{item.name}</p>
        ))}
        </div>
    )
}

export default Form