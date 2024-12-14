import React from 'react'

const LocationSearchPanel = (props) => {
    const location = [
        "new address karachi north, 123",
        "new address karachi north, 123"
    ]
  return (
    <div>
        {
            location.map(function(elem, index){
                return <div key={index}
                onClick={() => {
                    props.setVehiclePanelOpen(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center'><i className='ri-map-pin-fill'></i></h2>
                <h4 className='font-medium'>{elem}</h4>
              </div>
            })
        }
    
    </div>
  )
}

export default LocationSearchPanel
