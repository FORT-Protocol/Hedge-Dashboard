import {SimpleGrid, Stack} from "@chakra-ui/react";
import Norm from "../../components/Norm";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import {totalTxVolumeAtom} from "../../state/futures/updateTotalTxVolume";
import {useRecoilValue} from "recoil";
import {currentOpenShortPositionsAtom} from "../../state/futures/updateCurrentOpenShortPositionDCU";
import {currentOpenLongPositionsAtom} from "../../state/futures/updateCurrentOpenLongPositionsDCU";
import {totalTxVolumeListAtom} from "../../state/futures/updateTotalTxVolumeList";
import {longShortDistributionAtom} from "../../state/futures/updateLongShortDistribution";
import {leverageDistributionAtom} from "../../state/futures/updateLeverageDistribution";
// import {openPriceDistributionAtom} from "../../state/futures/updateOpenPriceDistribution";
import {totalTradingVolumeListAtom} from "../../state/futures/updateTotalTradingVolumeList";
import {statusAtom} from "../../hooks/useFetchFuturesTxList";
import {PROCESSING} from "../../constant/status";

const Futures = () => {
  const totalTxVolume = useRecoilValue(totalTxVolumeAtom({}))
  const curOpenLongPositions = useRecoilValue(currentOpenLongPositionsAtom({}))
  const curOpenShortPositions = useRecoilValue(currentOpenShortPositionsAtom({}))
  const totalTxVolumeList = useRecoilValue(totalTxVolumeListAtom({}))
  const longShortDistribution = useRecoilValue(longShortDistributionAtom({}))
  const leverageDistribution = useRecoilValue(leverageDistributionAtom({}))
  // const openPriceDistribution = useRecoilValue(openPriceDistributionAtom({}))
  const totalTradingVolumeList = useRecoilValue(totalTradingVolumeListAtom({}))
  const status = useRecoilValue(statusAtom)

  return (
    <Stack spacing={["22px", "22px", "44px"]} p={["22px", "22px", "44px"]}>
      <SimpleGrid columns={[1, 3, 3, 3, 3]} spacing={["22px", "22px", "44px"]}>
        <Norm value={status === PROCESSING ? "-" : totalTxVolume.toFixed(2)} desc={"Total Transaction Volume"} color={"#C7A072"}/>
        <Norm value={status === PROCESSING ? "-" : curOpenLongPositions.toFixed(2)} desc={"Current Open Long Positions (DCU)"} color={"#00B388"}/>
        <Norm value={status === PROCESSING ? "-" : curOpenShortPositions.toFixed(2)} desc={"Current Open Short Positions (DCU)"} color={"#F23A12"}/>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={["22px", "22px", "44px"]}>
        <LineChart title={"Total Transaction Volume"} suffix={"DCU"} data={totalTxVolumeList}/>
        <LineChart title={"Total Trading Volume"} suffix={"DCU"} data={totalTradingVolumeList}/>
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={["22px", "22px", "44px"]}>
        <PieChart title={"Long-Short Distribution"} data={longShortDistribution}/>
        <PieChart title={"Leverage Distribution"} data={leverageDistribution}/>
      </SimpleGrid>
      {/*<SimpleGrid columns={1}>*/}
      {/*  <PieChart title={"Open Price distribution (DCU)"} data={openPriceDistribution}/>*/}
      {/*</SimpleGrid>*/}
    </Stack>
  )
}

export default Futures
