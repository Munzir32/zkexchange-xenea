import React, { useState } from 'react';
import CustomInput from './CustomInput';
import { zkexchange } from '~~/contracts/zkexchange';
import { getGeneralPaymasterInput } from "viem/zksync";
import { toast } from "react-toastify";
import { walletClient } from "~~/utils/wagmi"

const AddTokenModal = () => {
    const openModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };



    const [tokenAddress, settokenAddress] = useState("")
    const [fee, setFee] = useState<any>("")
    const [min, setMin] = useState<any>("")
    const [max, setMax] = useState<any>("")
    const [loading, setLoading] = useState(false)
    const isFormFilled = tokenAddress && fee && min && max

    const paymasterAddress = "0xBAb868Bfd8BB3e1B3Adaec62c69CE5DA6FEb3879"
    const handleToken = async () => {
        // setLoading(true)
        if (!isFormFilled) throw new Error("fill the form")
            
            const [account] =
            typeof window !== "undefined" && window.ethereum
            ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
            : [];

        if (!account) {
            throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
        }
            await walletClient?.writeContract({
                address: zkexchange.address,
                abi: zkexchange.abi,
                functionName: "addToken",
                args: [tokenAddress, fee, min, max],
                account
            })
            // setLoading(false)
       


    }

    const addToken = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        try {
            await toast.promise(
                handleToken(), {
                pending: "Adding Token",
                success: "Token added Successful",
                error: "Unexpected Error"
            }
            )
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <div>
            <button className="btn" onClick={openModal}>Add Token</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="" >
                        <form method="dialog">
                        <label htmlFor="label" className=" text-lg mb-3 text-center font-bold p-10">Token Address</label>
                            <CustomInput
                                type="string"
                                name="string"
                                // required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => settokenAddress(e.target.value)}
                                className="w-full py-3 rounded-md flex text-black items-center px-3 bg-[#EAF0F7]"
                            />
                            <label htmlFor="label" className=" text-lg mb-3 text-center font-bold p-10">Token Fee in USD</label>
                            <CustomInput
                                type="number"
                                name="number"
                                // required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFee(e.target.value)}
                                className="w-full py-3 text-black rounded-md flex items-center px-3 bg-[#EAF0F7]"
                            />

<label htmlFor="label" className=" text-lg mb-3 text-center font-bold p-10">Minimum order</label>
                            <CustomInput
                                type="number"
                                name="number"
                                // required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(e.target.value)}
                                className="w-full text-black py-3 rounded-md flex items-center px-3 bg-[#EAF0F7]"
                            />

<label htmlFor="label" className=" text-lg mb-3 text-center font-bold p-10">Maximum Order</label>
                            <CustomInput
                                type="number"
                                name="number"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.value)}
                                className="w-full py-3 text-black rounded-md flex items-center px-3 bg-[#EAF0F7]"
                            />

                            <div>

                            <button disabled={loading || !isFormFilled} className=' py-5 px-5 rounded-lg bg-[#2b3655]' onClick={addToken}>Add </button>
                            <button className="btn mt-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg" >Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddTokenModal;
