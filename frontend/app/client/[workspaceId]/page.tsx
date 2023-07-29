
'use client'
import React, {useState, useEffect} from "react";
import RoomNav from '@/app/components/navbars/RoomNav'
import axios from 'axios';
import { useFetch } from "@/app/hooks/useFetch";
import { headers } from "next/dist/client/components/headers";

const page = () => {



  // const { response, error, loading } = useFetch({
  //   method: 'POST',
  //   url: '/api/createAUser', // Adjust the URL to your API endpoint
  //   data: {
  //     username: 'Lawrence',
  //     email: 'test@gmail.com',
  //     password: '12345'
  //   }
  // });

  const data = {
    username: 'Lawrence',
    email: 'test@gmail.com',
    password: '12345',
  };
  
  const postData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  
  useEffect(() => {
    postData();
  }, []);  
  

  // const [data, setData] = useState([])
  
  // useEffect(() => {
  //   if(response){
  //     console.log(response)
  //     setData(response)
  //   }
  // }, [response])
  
  
  return (
    <div className=" pt-[44px]">
      {/* {data?.map((itm: any) => (
          <div className="text-black" key={itm.id}>{itm.title}</div>
      ))} */}
    </div>
  )
}

export default page