import React, { useState, useEffect, useCallback } from 'react'
import { truuncateAddress } from '~~/helpers/truncateAddress'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';
import { zkexchange } from '~~/contracts/zkexchange';
import { useReadContract } from 'wagmi';
// interface SellOrderPlaced {
//     currency: string;
    
//     orderId: string;
//     seller: string;
//     token: string;
//     amountInCurrency: string;
//     amountInToken: string;
//   }
interface Order {
    _TransactionState: number;
    nonce: number;
    seller: string;
    buyer: string;
    token: string;
    currency: string;
    amountInToken: number;
    amountInCurrency: number;
  }
  
const Transaction = (
    {id}: any
    // { seller, currency, orderId, amountInCurrency, amountInToken }: SellOrderPlaced

) => {

//     const query = gql`
//     {
//         sellOrderPlaceds {
//     currency
//     id
//     orderId
//     seller
//     token
//     amountInCurrency
//     amountInToken
//   }
//     }
//     `

//     const url = "https://api.studio.thegraph.com/query/88031/zkexchange/v0.0.1"

//     const { data, status } = useQuery({
//         queryKey: ['data'],
//         async queryFn() {
//             return await request(url, query)
//         }
//     })

const { data: fetchOrder} = useScaffoldReadContract({
    contractName: "Zkexchange",
    functionName: "_orders",
    args: [0 as any],
})

console.log(fetchOrder)

const {data: orederData} = useReadContract({
    address: zkexchange.address,
    abi: zkexchange.abi,
    functionName: "_orders",
    args: [id]
})

const [ordersPlaced, setOrdersPlaced] = useState<Order | null>(null);

const getOrders = useCallback(() => {
    if (!orederData) return null;

    setOrdersPlaced({
        _TransactionState: Number(orederData[0]),
        nonce: Number(orederData[1]),
        seller: orederData[2],
        buyer: orederData[3],
        token: orederData[4],
        currency: orederData[5],
        amountInToken: Number(orederData[6]),
        amountInCurrency: Number(orederData[7])
    });
  }, [orederData]);


// 0: 1
// 1: 0n
// 2: "0xbE70b0cE9ecB7c0c4f0be93d8c329212a90BE112"
// 3: "0x0000000000000000000000000000000000000000"
// 4: "0x2E0319a0C40c6c918EC418DD3444352413cEba20"
// 5: "ngn"
// 6: 1n
// 7: 1n

  useEffect(() => {
    getOrders();
  }, [getOrders]);


console.log(orederData)
console.log(ordersPlaced?.nonce, "nonce")

if (!ordersPlaced) return null;

    return (
        <>

            <tbody>
                {/* row 1 */}
                <tr>
                    {/* <th>Mine</th> */}
                    <th>{id}</th>
                    <td>{truuncateAddress(ordersPlaced?.seller)}</td>
                    <td>{ordersPlaced?.amountInCurrency.toString()}</td>
                    <td>{ordersPlaced?.currency}</td>
                    <td>{ordersPlaced?.amountInToken.toString()}</td>
                </tr>
                
            </tbody>
        </>
    )
}

export default Transaction