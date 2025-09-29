import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../component/index'
import appWriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

export const EditPost = () => {
    const [posts,setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()
 
    useEffect(()=>{ 
        appWriteService.getPost(slug)
        .then((posts)=>{
          if(posts)
            setPosts(posts)
          else
            navigate("/")
        })

    },[slug,navigate])

  return posts ?  (
    <div className='py-8'>
      <Container>
        <PostForm {...posts}/>
      </Container>
    </div>
  ) : null
}
