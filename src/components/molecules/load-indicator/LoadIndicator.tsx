import { useMemo } from "react"
import Loader from "react-ts-loaders";

export default () => {
    const message = useMemo(() => {
        const index = Math.floor(Math.random() * HACKER_STATUS.length);
        return HACKER_STATUS[index];
    }, []);

    return (
        <div className="mt-4 flex-col justify-center">
            <p className="translate-y-4">{message}</p>
            <Loader type="ellipsis" color="hotpink" />
        </div>
    );
}

const HACKER_STATUS: Readonly<string[]> = [
    "Hacking into the web’s secrets",
    "Delving into the dark web’s mysteries",
    "Uncovering hidden truths online",
    "Infiltrating the web’s inner sanctum",
    "Deciphering the web’s encrypted secrets",
    "Cracking open the web’s hidden vaults",
    "Penetrating the web’s shadowy underworld",
    "Unearthing the web’s buried treasures",
    "Revealing the web’s covert operations",
    "Decrypting the web’s secret codes",
    "Hacking the web for answers",
    "Scanning the net for clues",
    "Digging up dirt online",
    "Probing the web for intel",
    "Sifting through data on the net",
    "Mining the web for info",
    "Extracting knowledge from the net",
    "Uncovering secrets online",
    "Prying open the web for answers",
    "Decoding the internet for information",
];