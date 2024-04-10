import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatEther } from "viem";
import { deserialize, useAccount, useBalance, useReadContract } from "wagmi";
import abi from "../abi/erc20.abi.json";

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export function ShowBalance() {
  const account = useAccount();
  const result = useBalance({
    address: account.address,
  });

  const resultFakeWeth = useReadContract({
    abi,
    address: "0x4Ed72e128865ddEa054261B8ef6b756C0C17C3f5",
    functionName: "balanceOf",
    args: [account.address],
  });

  const [ethValue, setEthValue] = useState(0);
  const [fakeWethValue, setFakeWethValue] = useState(0);
  useEffect(() => {
    if (result.data?.value !== undefined) {
      setEthValue(deserialize(result.data.value.toString()));
    }
    if (resultFakeWeth.data) {
      console.info(resultFakeWeth.data.toString());
      setFakeWethValue(deserialize(resultFakeWeth.data.toString()));
    }
  }, [result, resultFakeWeth]);
  return (
    <Wrapper>
      <div>FAKE WETH VALUE: {formatEther(BigInt(fakeWethValue))}</div>
      <div>ETH VALUE: {formatEther(BigInt(ethValue))}</div>
    </Wrapper>
  );
}
