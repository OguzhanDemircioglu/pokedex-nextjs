import "@/styles/Global.scss";
import {GlobalProvider} from "@/context/Global";

export default function App({Component, pageProps}) {
    return (
        <>
            <GlobalProvider>
                <Component {...pageProps} />
            </GlobalProvider>
        </>
    );
}
