import {useGlobalContext} from "@/context/Global";

export default function Home() {
    const val = useGlobalContext();
    console.log(val);
    return (
        <>

        </>
    );
}