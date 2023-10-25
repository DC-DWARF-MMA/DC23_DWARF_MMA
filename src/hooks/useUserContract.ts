import { useEffect, useState } from "react";
import { Contract } from "../pages/ContractInterface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useUserContract = (userMail: string) => {
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    (async () => {
      const contractsCollection = collection(db, "contract");
      const snapshot = await getDocs(contractsCollection);
      const userContract = snapshot.docs
        .map((doc) => doc.data())
        .filter((data) => data["email"] == userMail)
        .at(0) as Contract;
      setContract(userContract);
    })();
  }, [userMail]);

  return contract;
};
