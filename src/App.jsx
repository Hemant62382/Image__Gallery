import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css'

const API_KEY = "VMakXuVCkJijxgQsrteKpZ2eUaOiirUNzMXIaQNuw0gON1jlj1fXh210"

const App = () => {
const [photos, setPhotos] = useState([])
const [loading, setLoading] = useState(false)
const [page, setPage] = useState(12)
const [quaery, setQuaery] = useState("")
const [histary, setHistary] = useState("")
const [darkMode, setDarkMode] = useState(false)


  const fetchImages =async ()=>{
    try{
      setLoading(true)
      const options ={
        headers:{
          Authorization: API_KEY
        }
      }
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${quaery}e&page=1&per_page=${page}`, options)
      console.log(res.data);
      setPhotos(res.data.photos)
      
    }
    catch(err)
    {
      toast.error("Error fetching images")
    }
    finally{
      setLoading(false)
    }
  }

  const loadMore = ()=>{
    setPage(page+12)
  }

  const search =(e)=>{
    e.preventDefault()
    setQuaery(e.target[0].value.trim())
    setPage(12)
    setHistary('')
  }


  useEffect(() => {
    fetchImages()
  }, [page,quaery])
  

  return (
    <div 
    style={darkMode ? {backgroundColor:"#1e293b", color:'white'} : {backgroundColor:"#f3f4e4", color:"black"}}
    className='bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12  animate__animated animate__fadIn '  >

    <div className="h-[50px] w-[50px]  absolute top-4 right-4  flex justify-center items-center rounded-full cursor-pointer hover:scale-110 transition-transform text-4xl">
    {
      darkMode ? <button onClick={()=>setDarkMode(false)}><i className="ri-sun-line cursor-pointer h-full w-full "></i></button> :
      <button onClick={()=>setDarkMode(true)}><i className="ri-contrast-2-fill cursor-pointer size-5 h-full w-full"></i></button>
    }
    </div>
    <h1 className='text-4xl font-bold text-indigo-600 ' >
      📷
      Image Gallery
    </h1>
   
   <form
    onSubmit={search}   className="">
     <input
     value={histary}
     onChange={(e)=>setHistary(e.target.value)}
    className="p-3 bg-white text-black rounded-l-lg md:w-[400px] focus:outline-indigo-600"
    placeholder='Search images...'
     type="text" />
    <button className=" bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold rounded-r-lg py-3 px-8 hover:scale-110 transition-transform " >Search </button>
   </form>

    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 w-9/12">
     {
      photos.map((items,index)=>(
        <div key={index} className=" bg-white rounded-2xl p-2">
         <img
         style={darkMode ? {boxShadow:"0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19)"} : {boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
          className=' rounded-t h-[180px] w-full object-cover hover:scale-110 transition-transform duration-300 ' src={items.src.medium} alt={items.alt} />
         <div className="p-3">
          <h1 className=' text-lg font-medium capitalize text-gray-500'>{items.photographer}</h1>
          <a href={items.src.original} className=' mt-2 block text-center bg-gradient-to-br from-indigo-600 via-cyan-500 to-green-600 text-white font-bold rounded-lg py-2 px-4 hover:scale-105 transition-transform'>
            <i className="ri-download-line mr-1"></i>
            Download
          </a>
         </div>
        </div>
      ))
     }
    </div>
    {
      photos.length===0 && !loading &&
      <h2 className='text-4xl font-medium text-gray-700 text-center mt-4 uppercase'>photos not found please search again</h2>
    }
    {
      loading && 
      <p className='text-gray-400 text-4xl mt-4' >
    <i className="ri-loader-2-line animate-spin inline-block"></i>
    loading .....
    </p>
    }

    <button onClick={loadMore} className='bg-rose-500 py-3 px-16 rounded-lg font-medium text-white hover:scale-105 transition-transform' >Load More</button>


      <ToastContainer />
    </div>
  )
}

export default App
