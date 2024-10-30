import React from 'react'
import "../Component/Admin.css";
import { MdOutlineAnalytics,MdOutlineAttachMoney } from "react-icons/md";

function Dashboard() {
  return (
  <>
    <main className='ml-28 lg:ml-72   -mt-[1px] pt-5  pr-5'>
        <h1 className='font-poppins font-semibold text-2xl  mt-5 mb-2'>Dashboard</h1>
        <div className="date">
          <input type="date" />
        </div>
        <div className="insights grid grid-cols-1 lg:grid-cols-3 w-auto  ">
          <div className="sales ">
          <div className=" bg-[#7380ec] flex justify-center h-16 p-3 items-center w-16 rounded-full ">
          <MdOutlineAnalytics className=' text-white'/>
          </div>
            <div className="middle  ">
              <div className="left">
                <h3 className='font-semibold text-xl'>Total Sales</h3>
                <h1 className='font-normal text-lg'>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p className='font-semibold'>81%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">
              Last 24 Hours
            </small>
          </div>
          {/*-- End of the sales*/}
          <div className="expenses">
          
            {/* <span className="material-symbols-outlined">insert_chart</span> */}
            <div className=" bg-[#ff7782] flex justify-center h-16 p-3 items-center w-16 rounded-full ">
          <MdOutlineAnalytics className=' text-white'/>
          </div>
            <div className="middle">
              <div className="left">
                <h3 className='font-semibold text-xl'>Total Sales</h3>
                <h1 className='text-lg'>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p className='font-semibold'>62%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">
              Last 24 Hours
            </small>
          </div>
          {/*-- End of the expenses*/}
          <div className="income">
          <div className=" bg-[#41f1bc] flex justify-center h-16 p-3 items-center w-16 rounded-full ">
          <MdOutlineAttachMoney className='text-white'/>
          </div>
            {/* <span className="material-symbols-outlined">paid</span> */}
            <div className="middle">
              <div className="left">
                <h3 className='font-semibold text-xl'>Total income</h3>
                <h1 className='text-lg'>$10,864</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p className='font-semibold'>44%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">
              Last 24 Hours
            </small>
          </div>
          {/*-- End of the income*/}
        </div>
      </main>

  </>
  )
}

export default Dashboard