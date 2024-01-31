
'use client'
import React, {useState, useEffect} from "react";
import RoomNav from '@/app/components/navbars/RoomNav'
import axios from 'axios';
import { useFetch } from "@/app/hooks/useFetch";
import { headers } from "next/dist/client/components/headers";
import { useParams } from "next/navigation";

const page = () => {

  const params = useParams()
  const workspaceId = params.workspaceId

    // console.log(workspaceId)

  

  
  useEffect(() => {
    // postData();
  }, []);  
  
  
  return (
    <div className=" pt-[44px]">
      
    </div>
  )
}

export default page