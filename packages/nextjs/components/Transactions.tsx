import React from 'react';
import Transaction from './Transaction';
import { zkexchange } from '~~/contracts/zkexchange';
import { useReadContract } from 'wagmi';
// import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';

// Define the structure of your data
// interface SellOrderPlaced {
//   currency: string;
//   id: string;
//   orderId: string;
//   seller: string;
//   token: string;
//   amountInCurrency: string;
//   amountInToken: string;
// }

// interface SellOrderPlacedsData {
//   sellOrderPlaceds: SellOrderPlaced[];
// }

const Transactions = () => {

  const {data: orederCount} = useReadContract({
    address: zkexchange.address,
    abi: zkexchange.abi,
    functionName: "_ordersCount",
    args: []
})

const Orderlen = orederCount ? Number(orederCount.toString()) : 0;

const getOrderHistory = () => {
  if (!Orderlen) return null;

  const registerPartner = [];

  for (let i = 0; i < Orderlen; i++){
    registerPartner.push(
      <Transaction id={i} key={i} />
    )
  }
  return registerPartner;
};

  

  // console.log(data?.sellOrderPlaceds, status);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Seller</th>
              <th>Amount Currency</th>
              <th>Currency</th>
              <th>Token Amount</th>
            </tr>
          </thead>
          <>
          {getOrderHistory()}
          
        
        </>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
