import React, { useState } from 'react'
import Title from '../../components/Title'
import {assets} from '../../assets/assets'
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast'

const text = "Fill in the details carefully and accurate artist details, pricing, and features, to enhance the user booking experience."


const AddArtist = () => {

  const {axios, getToken} = useAppContext();

  const [images,setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  })
  const [inputs, setInputs] = useState({
    name:"",
    styles: {
      'Neo-Traditional': false,
      'Black & Grey': false,
      'Realism': false,
      'Japanese': false,
      'Minimalist': false,
      'Horror': false,
    },
    pricePerHour: 0,
});


  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {

    e.preventDefault()
    if ( !inputs.name|| !inputs.styles || !inputs.pricePerHour || !Object.values(images).some(image => image)){
      toast.error("Please fill in all the details");
      return ;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      const styles = Object.keys(inputs.styles).filter(key => inputs.styles[key])
      formData.append('name',inputs.name)
      formData.append('styles', JSON.stringify(styles))
      formData.append('pricePerHour', inputs.pricePerHour)

      Object.keys(images).forEach((key)=>{
        images[key] && formData.append('images', images[key])
      })

      const { data} = await axios.post('/api/artists/', formData, {headers:{Authorization:`Bearer ${await getToken()}`}}) 

      if (data.success){
        toast.success(data.message)
        setInputs({
          name:"",
          styles: {
            'Neo-Traditional': false,
            'Black & Grey': false,
            'Realism': false,
            'Japanese': false,
            'Minimalist': false,
            'Horror': false,
            },
          pricePerHour:0,
        })
        setImages({1:null, 2:null, 3:null, 4:null})
      }
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
        toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
    
  }


  return (
    <form onSubmit={onSubmitHandler} action="">
      <Title align='left' font='outfit' title='Add Artist' subTitle={text}/>
      {/* */}


      <p className='text-gray-800 mt-10'>Artist Name</p>
      <input type="text" placeholder='Name' className='border border-gray-300 mt-1 rounded p-2 w-60'
      value={inputs.name} onChange={e=>setInputs({...inputs, name:e.target.value})}/>
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => 
          <label htmlFor={`artistImage${key}`} key={key}>

            <img className='max-h-13 cursor-pointer opacity-80'
            src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`artistImage${key}`} hidden
            onChange={(e)=> setImages({...images, [key]: e.target.files[0]})}/>
          </label>
        )}
      </div>

      <div className='w-full flex max-sm:flext-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
           <p className='text-gray-800 mt-4'>Styles</p>
            <div className='flex flex-col mt-1 text-gray-400'>
            {Object.keys(inputs.styles).map((styles, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`styles${index + 1}`}
                checked={inputs.styles[styles]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    styles: {
                      ...inputs.styles,
                      [styles]: !inputs.styles[styles],
                    },
                  })
                }
                />
                <label htmlFor={`styles${index + 1}`}> {styles}</label>
              </div>
              ))}
            </div>
          </div>


        <div>
          <p className='mt-4 text-gray-800'>
              Price <span className='text-xs'>/ hour</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24'
          value={inputs.pricePerHour} onChange={e=>setInputs({...inputs, pricePerHour:e.target.value})}/>
        </div>
      </div>
        <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'
        disabled={loading}>
          {loading ? "Adding..." : "Add Artist"}
        </button>
    </form>
  )
}

export default AddArtist;
