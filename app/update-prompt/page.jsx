'use client'
import {useState,useEffect} from 'react';

import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form';
const EditPrompt = () => {
  const router=useRouter();
  const searchParams=useSearchParams();
  const [submitting,setSubmitting]=useState(false);
  const promptId=searchParams.get('id');
  const [post,setPost]=useState({
    prompt:'',
    tag:'',
  })
  
  useEffect(()=>{
    const getPromptDetails=async()=>{
        
        const response=await fetch(`api/prompt/${promptId}`)
    const data=await response.json();
    
    setPost({
        prompt:data.prompt,
        tag:data.tag,
    })}
    if(promptId) getPromptDetails()
  },[promptId])

  const UpdatePrompt = async(e) =>{
   e.preventDefault();
   setSubmitting(true);
   
   if(!promptId) return alert('Prompt Id not Found');
   try{
    console.log(promptId)
    const response=await fetch(`api/prompt/${promptId}`,{
      method:'PATCH',
      body:JSON.stringify({
        prompt:post.prompt,
        tag:post.tag
      })
    })
    if(response.ok){
      router.push('/profile');
    }
   }catch(error){
      console.log(error);
   }
   finally{
    setSubmitting(false);
   }

  }
  return (
    <div>
      <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
      />
      
    </div>
  )
}

export default EditPrompt
