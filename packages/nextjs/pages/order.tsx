import React, { useState } from 'react'
import type { ChangeEvent } from "react";
import { walletClient } from "~~/utils/wagmi"
import CustomInput from '~~/components/CustomInput'
import { zkexchange } from '~~/contracts/zkexchange';
import { toast } from "react-toastify";

const Order = () => {
  const [amountInToken, setAmountInToken] = useState<any>('')
  const [amountInCon, setAmountInCon] = useState<any>('')
  const [currency, setCurrency] = useState<string>('ngn')
  const [tokenAddress, settokenAddress] = useState<any>('0x493257fD37EDB34451f62EDf8D2a0C418852bA4C')
  const [loading, setLoading] = useState(false)

  // const isFormFilled = amountInCon && amountInToken && currency && tokenAddress

  const handleClear = () => {
    setAmountInToken("")
    setAmountInCon("")
    settokenAddress("")
    settokenAddress('')
  }



  const handleExchange = async () => {
    // if (!isFormFilled) throw new Error("fill the form")

    const [account] =
      typeof window !== "undefined" && window.ethereum
        ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
        : [];

    if (!account) {
      throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
    }

    setLoading(false)
    try {
      await walletClient?.writeContract({
        address: zkexchange.address,
        abi: zkexchange.abi,
        functionName: "placeSellOrder",
        args: [amountInToken, amountInCon, currency, tokenAddress],
        value: amountInToken,
        account
      })
      handleClear()
      setLoading(false)
    } catch (error) {
      
      console.log(error)
      setLoading(false)
    }

    setLoading(false)
  }

  const placeorder = async (e: any) => {
    e.preventDefault();
    try {
      await toast.promise(
        handleExchange(), {
        pending: "placing order",
        success: "order success, waiting for fund release",
        error: "Unexpected Error"
      }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex text-center flex-col '>
      <div className='  flex text-center flex-col'>
      <label htmlFor="label" className=" text-2xl mb-3 text-center font-bold p-10">Deposit Your Stablecoin</label>
      </div>
    <div className="flex items-center justify-center">
      <div className=" mt-5">

        <CustomInput
          type="string"
          name="number"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            try {
              const amount = parseInt(e.target.value);
              setAmountInToken(amount);
            } catch (error) { }
          }}
          placeholder='token'
          className="w-400 py-3 rounded-md text-white flex items-center px-3 bg-[#EAF0F7]"
          />

        <CustomInput
          type="number"
          name="number"
          required
          placeholder='amount in currency'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmountInCon(e.target.value)}
          className="w-full py-3 rounded-md flex text-white items-center px-3 bg-[#EAF0F7]"
          />
        <div>
        <label htmlFor="label" className=" text-2xl mb-3 text-center font-bold p-10">Select Currency</label>

          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setCurrency(e.target.value);
            }}
            required
            name="fiat_currency"
            id="" className="w-full py-3 rounded-md flex items-center px-3 bg-[#EAF0F7]"
            >
            <option value="ngn">Naira</option>
            <option value="kes">Kenya Shillings</option>
            <option value="ghc">Cedis</option>
          </select>
        </div>

        <div className=' mt-10' style={{ marginTop: '15px'}}>
        <label htmlFor="label" className=" text-2xl mb-3 text-center font-bold p-10">Select Token Type</label>

          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              settokenAddress(e.target.value);
            }}
            required
            name="fiat_currency"
            id="" className="w-full py-3 rounded-md flex items-center px-3 bg-[#EAF0F7]"
            >
            <option value="0x493257fD37EDB34451f62EDf8D2a0C418852bA4C">USDT</option>
            <option value="0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4">USDC</option>
            <option value="0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E">Zksync</option>
            {/* <option value="0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E">Zksync</option> */}
            <option value="0x2E0319a0C40c6c918EC418DD3444352413cEba20">ZK</option>

          </select>
        </div>
        <button type='submit' onClick={placeorder} disabled={loading} className='btn mt-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Order</button>
      </div>

    </div>
            </div>
  )
}

export default Order