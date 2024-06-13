//we have do this using snippets ctrl + shift + p -> snippets -> chris bakely snippets from github

import Hero from "@/components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";
type Props = {
    children : React.ReactNode;
    showHero?: boolean; 
}

const Layout = ({children , showHero=false}: Props) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Header/>
            {showHero && <Hero/> }
            
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer/>

        </div>
    )
  
}

export default Layout;