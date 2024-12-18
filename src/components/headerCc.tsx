"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function HeaderCc() {
	const pathname = usePathname();
	const active = (path: string) =>
		path === pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600";

	//videow-full absolute z-10
	//contaienr relative text-xl flex-wrap mx-auto
	return (
		<header className="flex-row items-center justify-between bg-sky-800 hidden sm:block text-white">
			<div className="flex items-center justify-between gap-x-2  p-4">
				<div className="flex items-center space-x-2 ">
					<Link href="/" className="font-bond text-3xl">
						<img
							src="/Runes-Logo.png"
							alt="Runes logo"
							width="40"
							height="40"
						/>
					</Link>

					<Link
						href={"https://leather.io/learn/bitcoin-runes"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						What are Runes?
					</Link>
					<Link
						href={"https://www.hiro.so/blog/introducing-the-runes-api"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						What is the Runes API?
					</Link>
					<Link
						href={"https://github.com/hirosystems/runehook"}
						target="_blank"
						className={buttonVariants({ variant: "link" })}
					>
						Runehook
					</Link>
				</div>
				<div className="flex items-center gap-x-2">
					<ModeToggle />
					<Button>Connect</Button>
				</div>
			</div>
		</header>
	);
}
//<ConnectWallet buttonLabel="Connect"/>
/*<Link href="/performance">Performance</Link>
	<Link href="/reliability">Reliability</Link>
	<Link href="/scale">Scale</Link>
 */
