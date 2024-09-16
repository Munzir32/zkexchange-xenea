import React, { useState } from 'react';
import CustomInput from './CustomInput';
import { zkexchange } from '~~/contracts/zkexchange';
import { toast } from "react-toastify";
import { walletClient } from "~~/utils/wagmi"
import { useReadContract } from 'wagmi';
const AccessManager = () => {
    const openModal = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

   

    const { data: manager_role } = useReadContract({
        address: zkexchange.address,
        abi: zkexchange.abi,
        functionName: "MANAGER_ROLE",
        args: []
    })

    console.log(manager_role)
    // 0x241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08


const handleClear = () => {
    setAccount("")
}
   

    const [accountM, setAccount] = useState('')
    const [loading, setLoading] = useState(false)
    // const isFormFilled = tokenAddress && fee && min && max

    const handleManageRole = async () => {
        setLoading(true)
        // if (!isFormFilled) throw new Error("fill the form")
            
            const [account] =
            typeof window !== "undefined" && window.ethereum
            ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
            : [];

        if (!account) {
            throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
        }

        try {
            
            await walletClient?.writeContract({
                address: zkexchange.address,
                abi: zkexchange.abi,
                functionName: "grantRole",
                args: [manager_role as `0x${string}`, accountM],
                account
            })
            handleClear()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }


    }

    const addManager = async (e: any) => {
        e.preventDefault();
        // setLoading(true)
        try {
            await toast.promise(
                handleManageRole(), {
                pending: "Granting manager role",
                success: "Role granted succefully",
                error: "Unexpected Error You must be an admin"
            }
            )
            // setLoading(false)
        } catch (error) {
            // setLoading(false)
            console.log(error)
        }
    }


    return (
        <div>
            <button className="btn" onClick={openModal}>Add Manager</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello Admin!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="" >
                        <form method="dialog">
                        <label htmlFor="label" className=" text-lg mb-3 text-center font-bold p-10">Address to be manager</label>
                            <CustomInput
                                type="string"
                                name="string"
                                // required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
                                className="w-full py-3 rounded-lg flex text-black items-center px-3 bg-[#EAF0F7]"
                            />
                            <div>

                            <button disabled={loading} className=' py-5 px-5 rounded-xl bg-[#2b3655]' onClick={addManager}>Add </button>
                            <button className="btn mt-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg" >Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AccessManager;
