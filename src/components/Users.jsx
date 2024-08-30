import axiosInstance from "../../axios";
import { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";

import React from 'react'

const Users = () => {
    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      const GetData = () => {
        axiosInstance.get(`users/`).then((res) =>{
            setMyData(res.data)
            setLoading(false)
            console.log(res.data)
        })
    }
        GetData()
    },[])
  return (
    <div>
    {loading ? <p>Loading...</p> : 
      <div>
        {myData.map((item, index) =>{
            return(
                <Box key={item.id} sx={{p:2, m:2, boxShadow:3}}>
                  <div>ID: {item.id}</div>
                  <div>Email: {item.email}</div>
                </Box>
            )
        })}
      </div>
    }
    </div>
  )
}

export default Users
