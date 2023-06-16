import { api } from "../api"
import {  useEffect, useState } from "react";



function HomeScreen() {
    const [feed, setFeed] = useState([])

    // useEffect(() => {
    //     async function fetchPosts(){
    //         const response = await api.get("/feed")

    //         setFeed([...response.data])
    //     }
    // })
 

  return (
    <div>
      This is HomeScreen
    </div>
  )
}

export default HomeScreen
