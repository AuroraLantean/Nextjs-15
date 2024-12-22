import Activity from "@/components/cards/activity";
import BalancesCard from "@/components/cards/balances";
import FeaturedCard from "@/components/cards/featured";
import RecentBlockActivity from "@/components/cards/recent-block-activity";
import {
	getAddressBalances,
	getApiStatus,
	getBlockActivity,
	getRunesEtchingInfo,
	getYourRunesActivity,
} from "@/lib/hiro-api";
import { ll } from "@/lib/utils";

async function retrieveAllData(userAddress: string) {
	const addressBalances = await getAddressBalances(userAddress);
	//return { response: addressBalances };

	const addressActivityForRune = await getYourRunesActivity(addressBalances);

	const apiStatus = await getApiStatus();

	const { results, totalRunesActivity, mostFrequentRunes } =
		await getBlockActivity(apiStatus.block_height.toString());

	const featuredRunes = await getRunesEtchingInfo(mostFrequentRunes);

	return {
		addressBalances,
		addressActivityForRune,
		apiStatus,
		blockActivity: results,
		totalActivityCount: totalRunesActivity,
		featuredRunes,
	};
}

export default async function Dashboard({
	params,
}: { params: Promise<{ userAddress: string }> }) {
	const userAddress = (await params).userAddress;
	//process.env.NEXT_PUBLIC_BITCOIN_RUNES_ADDR1 || "";
	//found from https://www.oklink.com/btc/token/runes/1-0
	console.log("Dashboard userAddress:", userAddress);
	const {
		addressBalances,
		addressActivityForRune,
		apiStatus,
		blockActivity,
		totalActivityCount,
		featuredRunes,
	} = await retrieveAllData(userAddress);
	//ll("out:", response.length);

	return (
		<div className="flex flex-col sm:flex-row mt-12 sm:mt-0 sm:p-4 h-[968px] items-start justify-center gap-2">
			<div className="flex flex-col flex-1 gap-2">
				<Activity addressActivityForRune={addressActivityForRune} />
				<FeaturedCard featuredRunes={featuredRunes} apiStatus={apiStatus} />
			</div>
			<div className="flex flex-col flex-1 gap-2">
				<BalancesCard addressBalances={addressBalances} />
				<RecentBlockActivity
					blockActivity={blockActivity}
					apiStatus={apiStatus}
					totalActivityCount={totalActivityCount}
				/>
			</div>
		</div>
	);
}
