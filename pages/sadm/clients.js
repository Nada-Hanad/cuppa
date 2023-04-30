import Head from 'next/head'
import Image from 'next/image'
import { Clients } from '../../components/shared/tableClient'
import { AddDistributeurForm } from '../../components/shared/addDistributeurForm'
import { useState } from 'react'
export default function SADM_clients() {
  const [showAddForm, setShowAddForm] = useState(false)
  const addBtnClick = () => {
    setShowAddForm(!showAddForm)
    console.log(showAddForm)
  }

  return (
    <div className="text-center pt-4 flex flex-col items-center gap-11 overflow-y-scroll overflow-x-hidden">
      <Head>
        <title>Gestion des clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border border-solid	border-[#222326] rounded-xl bg-header-bg w-fit px-4 py-2 shadow-md">
        <h1 className="text-4xl font-semibold text-[#222326]">
          Gestion des clients
        </h1>
      </div>
      <div className="flex w-[1000px] items-center justify-evenly">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="client"
          className="w-[650px] h-[60px] p-4 rounded-[15px] text-lg"
        ></input>
        <button className="w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center">
          <Image src="/icons/search.png" width={30} height={30}></Image>
        </button>
        <button
          onClick={addBtnClick}
          className="w-[150px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly"
        >
          <Image src="/icons/plus.png" width={35} height={35}></Image>
          Client
        </button>
      </div>
      {
        //showAddForm && <AddDistributeurForm onBtnClick={addBtnClick} />
      }
      <Clients />
    </div>
  )
}
